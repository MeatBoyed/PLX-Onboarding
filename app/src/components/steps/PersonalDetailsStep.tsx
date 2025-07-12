"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChevronLeft, User, MapPin, Wifi, FileText } from "lucide-react";
import { personalDetailsSchema } from "@/models/onboarding";
import { z } from "zod";

interface PersonalDetailsStepProps {
    onNext: () => void;
    onPrevious: () => void;
    onUpdateData: (data: any) => void;
    canProceed: boolean;
    errors?: Record<string, string[]>;
    initialData?: z.infer<typeof personalDetailsSchema>;
}

type PersonalDetailsForm = z.infer<typeof personalDetailsSchema>;

export function PersonalDetailsStep({
    onNext,
    onPrevious,
    onUpdateData,
    canProceed,
    errors: propErrors,
    initialData,
}: PersonalDetailsStepProps) {
    const form = useForm<PersonalDetailsForm>({
        resolver: zodResolver(personalDetailsSchema),
        defaultValues: initialData || {
            firstName: "",
            lastName: "",
            contactNumber: "",
            email: "",
            streetAddress: "",
            standNumber: "",
            wifiName: "",
            wifiPassword: "",
            specialRequests: "",
            acceptTerms: false,
        },
        mode: "onBlur", // Validate on blur for real-time feedback
    });

    const onSubmit = (data: PersonalDetailsForm) => {
        onUpdateData({ personalDetails: data });
        onNext();
    };

    // Watch form values to update parent component in real-time
    const watchedValues = form.watch();

    // Update parent component when form values change
    React.useEffect(() => {
        if (form.formState.isValid) {
            onUpdateData({ personalDetails: watchedValues });
        }
    }, [watchedValues, form.formState.isValid, onUpdateData]);

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Your Information</h2>
                <p className="text-muted-foreground mt-2">
                    Please provide your details to complete the setup
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6">
                        {/* Personal Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <User className="w-5 h-5" />
                                    <span>Personal Details</span>
                                </CardTitle>
                                <CardDescription>
                                    Your basic information for account setup
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your first name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your last name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="contactNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., +27 11 123 4567" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="your.email@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Location Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <MapPin className="w-5 h-5" />
                                    <span>Installation Address</span>
                                </CardTitle>
                                <CardDescription>
                                    Where should we install your fibre connection?
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="streetAddress"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Street Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="123 Main Street, Suburb" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="standNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Stand Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., 123 or 123A" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Wi-Fi Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Wifi className="w-5 h-5" />
                                    <span>Wi-Fi Configuration</span>
                                </CardTitle>
                                <CardDescription>
                                    Set up your Wi-Fi network name and password
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="wifiName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Wi-Fi Name (SSID)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., PluxNet_Home" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="wifiPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Wi-Fi Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Minimum 8 characters"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Additional Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <FileText className="w-5 h-5" />
                                    <span>Final Details</span>
                                </CardTitle>
                                <CardDescription>
                                    Any special requests and terms acceptance
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="specialRequests"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Special Requests (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Any special installation requirements or requests..."
                                                    rows={3}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="acceptTerms"
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
                                                    I accept the Terms & Conditions
                                                </FormLabel>
                                                <p className="text-xs text-muted-foreground">
                                                    By checking this box, you confirm that you have read and agree to our terms and conditions.
                                                </p>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-between pt-6">
                        <Button
                            type="button"
                            onClick={onPrevious}
                            variant="outline"
                            size="lg"
                            className="min-w-[120px]"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>
                        <Button
                            type="submit"
                            size="lg"
                            className="min-w-[120px]"
                            disabled={!form.formState.isValid}
                        >
                            Next Step
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
