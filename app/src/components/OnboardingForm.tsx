"use client";

import { Card, CardContent } from "@/components/ui/card";
import { StepIndicator } from "@/components/ui/step-indicator";
import { LocationStep } from "@/components/steps/LocationStep";
import { PackageStep } from "@/components/steps/PackageStep";
import { PersonalDetailsStep } from "@/components/steps/PersonalDetailsStep";
import { ConfirmationStep } from "@/components/steps/ConfirmationStep";
import { useOnboardingController } from "@/controllers/onboardingController";
import { FormStep } from "@/models/onboarding";

export function OnboardingForm() {
    const {
        currentStep,
        formData,
        selectedLocation,
        selectedPackage,
        isSubmitting,
        errors,
        getLocations,
        getPackagesForLocation,
        nextStep,
        previousStep,
        updateFormData,
        handleLocationSelect,
        handlePackageSelect,
        canProceed,
        submitForm,
        getStepInfo,
    } = useOnboardingController();

    const stepInfo = getStepInfo();
    const locations = getLocations();
    const packages = selectedLocation ? getPackagesForLocation(selectedLocation.id) : [];

    const renderCurrentStep = () => {
        switch (currentStep) {
            case FormStep.LOCATION:
                return (
                    <LocationStep
                        locations={locations}
                        selectedLocation={selectedLocation}
                        onLocationSelect={handleLocationSelect}
                        onNext={nextStep}
                        canProceed={canProceed()}
                        errors={errors}
                    />
                );

            case FormStep.PACKAGE:
                return (
                    <PackageStep
                        packages={packages}
                        selectedPackage={selectedPackage}
                        onPackageSelect={handlePackageSelect}
                        onNext={nextStep}
                        onPrevious={previousStep}
                        canProceed={canProceed()}
                        errors={errors}
                    />
                );

            case FormStep.PERSONAL_DETAILS:
                return (
                    <PersonalDetailsStep
                        onNext={nextStep}
                        onPrevious={previousStep}
                        onUpdateData={updateFormData}
                        errors={errors}
                    />
                );

            case FormStep.CONFIRMATION:
                return (
                    <ConfirmationStep
                        selectedLocation={selectedLocation}
                        selectedPackage={selectedPackage}
                        formData={formData}
                        onPrevious={previousStep}
                        onSubmit={submitForm}
                        isSubmitting={isSubmitting}
                        errors={errors}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
                        Welcome to <span className="text-primary">PluxNet Fibre</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Get connected with lightning-fast fibre internet in just a few simple steps
                    </p>
                </div>

                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                        <StepIndicator
                            currentStep={currentStep}
                            totalSteps={stepInfo.total}
                            steps={stepInfo.all}
                        />

                        <div className="mt-8">
                            {renderCurrentStep()}
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-muted-foreground">
                    <p>
                        Need help? Contact our support team at{" "}
                        <a href="mailto:support@pluxnet.co.za" className="text-primary hover:underline">
                            support@pluxnet.co.za
                        </a>{" "}
                        or{" "}
                        <a href="tel:+27118001234" className="text-primary hover:underline">
                            +27 11 800 1234
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
