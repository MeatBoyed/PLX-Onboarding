"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MapPin, Check } from "lucide-react";
import { Location, locationSelectionSchema } from "@/models/onboarding";
import { cn } from "@/lib/utils";
import { z } from "zod";

interface LocationStepProps {
    locations: Location[];
    selectedLocation: Location | null;
    onLocationSelect: (locationId: string) => void;
    onNext: () => void;
    canProceed: boolean;
    errors?: Record<string, string[]>;
    initialData?: z.infer<typeof locationSelectionSchema>;
}

type LocationForm = z.infer<typeof locationSelectionSchema>;

export function LocationStep({
    locations,
    onLocationSelect,
    onNext,
    errors,
    initialData,
}: LocationStepProps) {
    const form = useForm<LocationForm>({
        resolver: zodResolver(locationSelectionSchema),
        defaultValues: initialData || {
            locationId: "",
        },
        mode: "onChange",
    });

    const onSubmit = (data: LocationForm) => {
        onLocationSelect(data.locationId);
        onNext();
    };

    const handleLocationClick = (locationId: string) => {
        form.setValue("locationId", locationId);
        onLocationSelect(locationId);
    };
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Choose Your Service Location</h2>
                <p className="text-muted-foreground mt-2">
                    Select the area where you&apos;d like PluxNet Fibre installed
                </p>
                {errors?.location && (
                    <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                        <p className="text-sm text-destructive font-medium">
                            {errors.location[0]}
                        </p>
                    </div>
                )}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="locationId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {locations.map((location) => (
                                            <Card
                                                key={location.id}
                                                className={cn(
                                                    "cursor-pointer transition-all hover:shadow-md border-2",
                                                    field.value === location.id
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                                onClick={() => {
                                                    field.onChange(location.id);
                                                    handleLocationClick(location.id);
                                                }}
                                            >
                                                <CardHeader className="pb-3">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            <MapPin className="w-5 h-5 text-primary" />
                                                            <CardTitle className="text-lg">{location.name}</CardTitle>
                                                        </div>
                                                        {field.value === location.id && (
                                                            <Check className="w-5 h-5 text-primary" />
                                                        )}
                                                    </div>
                                                    <CardDescription>{location.city}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex flex-wrap gap-2">
                                                        {location.availablePackages.map((packageId) => (
                                                            <Badge key={packageId} variant="secondary" className="text-xs">
                                                                {packageId.charAt(0).toUpperCase() + packageId.slice(1)}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end pt-6">
                        <Button
                            type="submit"
                            size="lg"
                            className="min-w-[120px]"
                            disabled={!form.formState.isValid || !form.watch("locationId")}
                        >
                            Next Step
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
