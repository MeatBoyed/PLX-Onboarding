"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Wifi, Check, ChevronLeft } from "lucide-react";
import { Package, packageSelectionSchema } from "@/models/onboarding";
import { cn } from "@/lib/utils";
import { z } from "zod";

interface PackageStepProps {
    packages: Package[];
    selectedPackage: Package | null;
    onPackageSelect: (packageId: string) => void;
    onNext: () => void;
    onPrevious: () => void;
    canProceed: boolean;
    errors?: Record<string, string[]>;
    initialData?: z.infer<typeof packageSelectionSchema>;
}

type PackageForm = z.infer<typeof packageSelectionSchema>;

export function PackageStep({
    packages,
    onPackageSelect,
    onNext,
    onPrevious,
    errors,
    initialData,
}: PackageStepProps) {
    const form = useForm<PackageForm>({
        resolver: zodResolver(packageSelectionSchema),
        defaultValues: initialData || {
            packageId: "",
        },
        mode: "onChange",
    });

    const onSubmit = (data: PackageForm) => {
        onPackageSelect(data.packageId);
        onNext();
    };

    const handlePackageClick = (packageId: string) => {
        form.setValue("packageId", packageId);
        onPackageSelect(packageId);
    };
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Choose Your Internet Package</h2>
                <p className="text-muted-foreground mt-2">
                    Select the perfect plan for your needs
                </p>
                {errors?.package && (
                    <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                        <p className="text-sm text-destructive font-medium">
                            {errors.package[0]}
                        </p>
                    </div>
                )}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="packageId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {packages.map((pkg) => (
                                            <Card
                                                key={pkg.id}
                                                className={cn(
                                                    "cursor-pointer transition-all hover:shadow-lg border-2 relative",
                                                    field.value === pkg.id
                                                        ? "border-primary bg-primary/5 shadow-md"
                                                        : "border-border hover:border-primary/50",
                                                    pkg.id === "premium" && "ring-2 ring-primary/20"
                                                )}
                                                onClick={() => {
                                                    field.onChange(pkg.id);
                                                    handlePackageClick(pkg.id);
                                                }}
                                            >
                                                {pkg.id === "premium" && (
                                                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                                        Most Popular
                                                    </Badge>
                                                )}

                                                <CardHeader className="pb-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            <Wifi className="w-6 h-6 text-primary" />
                                                            <CardTitle className="text-xl">{pkg.name}</CardTitle>
                                                        </div>
                                                        {field.value === pkg.id && (
                                                            <Check className="w-5 h-5 text-primary" />
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="text-3xl font-bold text-primary">
                                                            R{pkg.price}
                                                            <span className="text-sm font-normal text-muted-foreground">/month</span>
                                                        </div>
                                                        <div className="text-lg font-semibold">{pkg.speed}</div>
                                                        <CardDescription className="text-sm">{pkg.description}</CardDescription>
                                                    </div>
                                                </CardHeader>

                                                <CardContent>
                                                    <ul className="space-y-2">
                                                        {pkg.features.map((feature, index) => (
                                                            <li key={index} className="flex items-center text-sm">
                                                                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                                                {feature}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
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
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>
                        <Button
                            type="submit"
                            size="lg"
                            className="min-w-[120px]"
                            disabled={!form.formState.isValid || !form.watch("packageId")}
                        >
                            Next Step
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
