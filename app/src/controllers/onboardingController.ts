'use client';

import { useState, useCallback } from 'react';
import {
    FormStep,
    OnboardingFormData,
    Location,
    Package,
    mockLocations,
    mockPackages,
    locationSelectionSchema,
    packageSelectionSchema,
    personalDetailsSchema,
    confirmationSchema
} from '@/models/onboarding';

export const useOnboardingController = () => {
    const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.LOCATION);
    const [formData, setFormData] = useState<OnboardingFormData>({});
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    // Get available locations
    const getLocations = useCallback(() => {
        return mockLocations;
    }, []);

    // Get available packages for selected location
    const getPackagesForLocation = useCallback((locationId: string) => {
        const location = mockLocations.find(loc => loc.id === locationId);
        if (!location) return [];

        return mockPackages.filter(pkg =>
            location.availablePackages.includes(pkg.id)
        );
    }, []);

    // Navigate to previous step
    const previousStep = useCallback(() => {
        if (currentStep > FormStep.LOCATION) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    // Update form data
    const updateFormData = useCallback((stepData: Partial<OnboardingFormData>) => {
        setFormData(prev => ({ ...prev, ...stepData }));
    }, []);

    // Handle location selection
    const handleLocationSelect = useCallback((locationId: string) => {
        const location = mockLocations.find(loc => loc.id === locationId);
        if (location) {
            setSelectedLocation(location);
            updateFormData({ location: { locationId } });
            // Reset package selection when location changes
            setSelectedPackage(null);
            setFormData(prev => ({ ...prev, package: undefined }));
        }
    }, [updateFormData]);

    // Handle package selection
    const handlePackageSelect = useCallback((packageId: string) => {
        const pkg = mockPackages.find(p => p.id === packageId);
        if (pkg) {
            setSelectedPackage(pkg);
            updateFormData({ package: { packageId } });
        }
    }, [updateFormData]);

    // Validate current step
    const validateCurrentStep = useCallback(() => {
        setErrors({});

        try {
            switch (currentStep) {
                case FormStep.LOCATION:
                    if (!formData.location || !selectedLocation) {
                        setErrors({ location: ['Please select a service location'] });
                        return false;
                    }
                    locationSelectionSchema.parse(formData.location);
                    return true;

                case FormStep.PACKAGE:
                    if (!formData.package || !selectedPackage) {
                        setErrors({ package: ['Please select an internet package'] });
                        return false;
                    }
                    packageSelectionSchema.parse(formData.package);
                    return true;

                case FormStep.PERSONAL_DETAILS:
                    if (!formData.personalDetails) {
                        setErrors({ personalDetails: ['Please fill in all required personal details'] });
                        return false;
                    }
                    personalDetailsSchema.parse(formData.personalDetails);
                    return true;

                case FormStep.CONFIRMATION:
                    if (!formData.confirmation?.confirmed) {
                        setErrors({ confirmation: ['Please confirm your order to proceed'] });
                        return false;
                    }
                    confirmationSchema.parse(formData.confirmation);
                    return true;

                default:
                    return false;
            }
        } catch (error: any) {
            if (error.errors) {
                const newErrors: Record<string, string[]> = {};
                error.errors.forEach((err: any) => {
                    const field = err.path.join('.');
                    if (!newErrors[field]) newErrors[field] = [];
                    newErrors[field].push(err.message);
                });
                setErrors(newErrors);
            }
            return false;
        }
    }, [currentStep, formData, selectedLocation, selectedPackage]);

    // Navigate to next step with validation
    const nextStep = useCallback(() => {
        if (validateCurrentStep() && currentStep < FormStep.CONFIRMATION) {
            setCurrentStep(currentStep + 1);
            setErrors({}); // Clear errors when moving to next step
            return true;
        }
        return false;
    }, [currentStep, validateCurrentStep]);

    // Check if current step can proceed
    const canProceed = useCallback(() => {
        return validateCurrentStep();
    }, [validateCurrentStep]);

    // Validate personal details
    const validatePersonalDetails = useCallback(() => {
        if (!formData.personalDetails) return false;

        try {
            personalDetailsSchema.parse(formData.personalDetails);
            return true;
        } catch {
            return false;
        }
    }, [formData.personalDetails]);

    // Submit form to N8N workflow
    const submitForm = useCallback(async () => {
        setIsSubmitting(true);

        try {
            const orderData = {
                ...formData,
                selectedLocation,
                selectedPackage,
                timestamp: new Date().toISOString(),
            };

            // For now, just log the data - replace with actual N8N webhook URL
            console.log('Submitting order data:', orderData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            return { success: true };
        } catch (error) {
            console.error('Error submitting form:', error);
            return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, selectedLocation, selectedPackage]);

    // Get progress percentage
    const getProgress = useCallback(() => {
        return ((currentStep + 1) / 4) * 100;
    }, [currentStep]);

    // Get step info
    const getStepInfo = useCallback(() => {
        const steps = [
            { title: 'Select Location', description: 'Choose your service area' },
            { title: 'Choose Package', description: 'Select your internet package' },
            { title: 'Your Information', description: 'Provide your details' },
            { title: 'Confirm Order', description: 'Review and confirm' },
        ];

        return {
            current: steps[currentStep],
            all: steps,
            currentIndex: currentStep,
            total: steps.length
        };
    }, [currentStep]);

    return {
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
        validateCurrentStep,
        canProceed,
        submitForm,
        getProgress,
        getStepInfo,
        setCurrentStep,
    };
};