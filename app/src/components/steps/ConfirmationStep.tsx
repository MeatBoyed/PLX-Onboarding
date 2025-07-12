"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChevronLeft, CheckCircle, MapPin, Wifi, User, Package, Loader2 } from "lucide-react";
import { Location, Package as PackageType, OnboardingFormData, confirmationSchema } from "@/models/onboarding";
import { z } from "zod";

interface ConfirmationStepProps {
    selectedLocation: Location | null;
    selectedPackage: PackageType | null;
    formData: OnboardingFormData;
    onPrevious: () => void;
    onSubmit: () => Promise<{ success: boolean; error?: string }>;
    isSubmitting: boolean;
    errors?: Record<string, string[]>;
    initialData?: z.infer<typeof confirmationSchema>;
}

type ConfirmationForm = z.infer<typeof confirmationSchema>;

export function ConfirmationStep({
    selectedLocation,
    selectedPackage,
    formData,
    onPrevious,
    onSubmit,
    isSubmitting,
    errors,
    initialData,
}: ConfirmationStepProps) {
    const [submitted, setSubmitted] = React.useState(false);

    const form = useForm<ConfirmationForm>({
        resolver: zodResolver(confirmationSchema),
        defaultValues: initialData || {
            confirmed: false,
        },
        mode: "onChange",
    });

    const handleSubmit = async (data: ConfirmationForm) => {
        if (!data.confirmed) return;

        const result = await onSubmit();
        if (result.success) {
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <div className="text-center space-y-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-green-600">Order Confirmed!</h2>
                    <p className="text-muted-foreground mt-2">
                        Thank you for choosing PluxNet Fibre. We'll be in touch soon to schedule your installation.
                    </p>
                </div>
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="text-lg">What happens next?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-left">
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-primary">1</span>
                            </div>
                            <p className="text-sm">We'll contact you within 24 hours to confirm your installation details</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-primary">2</span>
                            </div>
                            <p className="text-sm">Our team will schedule a convenient installation time</p>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-primary">3</span>
                            </div>
                            <p className="text-sm">Professional installation and setup of your high-speed fibre connection</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Confirm Your Order</h2>
                <p className="text-muted-foreground mt-2">
                    Please review your details before submitting your order
                </p>
                {errors?.confirmation && (
                    <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                        <p className="text-sm text-destructive font-medium">
                            {errors.confirmation[0]}
                        </p>
                    </div>
                )}
            </div>

            <div className="grid gap-6">
                {/* Selected Location */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5" />
                            <span>Service Location</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedLocation && (
                            <div>
                                <p className="font-medium">{selectedLocation.name}</p>
                                <p className="text-muted-foreground">{selectedLocation.city}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Selected Package */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Package className="w-5 h-5" />
                            <span>Selected Package</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedPackage && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-lg">{selectedPackage.name}</p>
                                        <p className="text-muted-foreground">{selectedPackage.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-primary">R{selectedPackage.price}</p>
                                        <p className="text-sm text-muted-foreground">per month</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge variant="secondary">{selectedPackage.speed}</Badge>
                                    {selectedPackage.features.slice(0, 2).map((feature, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {feature}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <User className="w-5 h-5" />
                            <span>Personal Information</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {formData.personalDetails && (
                            <div className="grid gap-3 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p className="font-medium">
                                        {formData.personalDetails.firstName} {formData.personalDetails.lastName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{formData.personalDetails.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Contact Number</p>
                                    <p className="font-medium">{formData.personalDetails.contactNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Stand Number</p>
                                    <p className="font-medium">{formData.personalDetails.standNumber}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-sm text-muted-foreground">Installation Address</p>
                                    <p className="font-medium">{formData.personalDetails.streetAddress}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Wi-Fi Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Wifi className="w-5 h-5" />
                            <span>Wi-Fi Configuration</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {formData.personalDetails && (
                            <div className="grid gap-3 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">Network Name (SSID)</p>
                                    <p className="font-medium">{formData.personalDetails.wifiName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Password</p>
                                    <p className="font-medium">{"•".repeat(formData.personalDetails.wifiPassword.length)}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Special Requests */}
                {formData.personalDetails?.specialRequests && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Special Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{formData.personalDetails.specialRequests}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Final Confirmation */}
                <Card className="border-primary/20">
                    <CardContent className="pt-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="confirmed"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm font-medium leading-none">
                                                    I confirm that all the information provided is accurate and I authorize PluxNet to proceed with this order.
                                                </FormLabel>
                                                <p className="text-xs text-muted-foreground">
                                                    By confirming, you agree to our service terms and authorize the installation at the specified address.
                                                </p>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-between pt-6">
                                    <Button
                                        type="button"
                                        onClick={onPrevious}
                                        variant="outline"
                                        size="lg"
                                        className="min-w-[120px]"
                                        disabled={isSubmitting}
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-2" />
                                        Previous
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="min-w-[140px]"
                                        disabled={!form.formState.isValid || isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Confirm Order"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
    // </div>
    // );
}
