import { z } from 'zod';

// Location model
export interface Location {
    id: string;
    name: string;
    city: string;
    availablePackages: string[];
}

// Package model
export interface Package {
    id: string;
    name: string;
    speed: string;
    price: number;
    description: string;
    features: string[];
}

// Form data schemas using Zod for validation
export const locationSelectionSchema = z.object({
    locationId: z.string().min(1, 'Please select a location'),
});

export const packageSelectionSchema = z.object({
    packageId: z.string().min(1, 'Please select a package'),
});

export const personalDetailsSchema = z.object({
    firstName: z.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
    lastName: z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
    contactNumber: z.string()
        .min(10, 'Contact number must be at least 10 digits')
        .max(15, 'Contact number must be less than 15 digits')
        .regex(/^[\d\+\-\s\(\)]+$/, 'Invalid phone number format. Use only numbers, +, -, (), and spaces'),
    email: z.string()
        .email('Please enter a valid email address')
        .min(5, 'Email must be at least 5 characters')
        .max(100, 'Email must be less than 100 characters'),
    streetAddress: z.string()
        .min(5, 'Street address must be at least 5 characters')
        .max(200, 'Street address must be less than 200 characters')
        .regex(/^[a-zA-Z0-9\s,.''-]+$/, 'Street address contains invalid characters'),
    standNumber: z.string()
        .min(1, 'Stand number is required')
        .max(20, 'Stand number must be less than 20 characters')
        .regex(/^[a-zA-Z0-9\s\/-]+$/, 'Stand number can only contain letters, numbers, spaces, hyphens, and forward slashes'),
    wifiName: z.string()
        .min(3, 'Wi-Fi name must be at least 3 characters')
        .max(32, 'Wi-Fi name must be less than 32 characters')
        .regex(/^[a-zA-Z0-9\s_-]+$/, 'Wi-Fi name can only contain letters, numbers, spaces, underscores, and hyphens'),
    wifiPassword: z.string()
        .min(8, 'Wi-Fi password must be at least 8 characters')
        .max(64, 'Wi-Fi password must be less than 64 characters')
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/, 'Wi-Fi password must contain at least one letter and one number'),
    specialRequests: z.string()
        .max(500, 'Special requests must be less than 500 characters')
        .optional(),
    acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions to proceed'),
});

export const confirmationSchema = z.object({
    confirmed: z.boolean().refine(val => val === true, 'Please confirm your order'),
});

// Combined form data type
export type OnboardingFormData = {
    location?: z.infer<typeof locationSelectionSchema>;
    package?: z.infer<typeof packageSelectionSchema>;
    personalDetails?: z.infer<typeof personalDetailsSchema>;
    confirmation?: z.infer<typeof confirmationSchema>;
};

// Complete order data for submission
export interface OrderData extends OnboardingFormData {
    selectedLocation?: Location;
    selectedPackage?: Package;
    timestamp: string;
}

// Form step enum
export enum FormStep {
    LOCATION = 0,
    PACKAGE = 1,
    PERSONAL_DETAILS = 2,
    CONFIRMATION = 3,
}

export const FORM_STEPS = [
    { id: FormStep.LOCATION, title: 'Select Location', description: 'Choose your service area' },
    { id: FormStep.PACKAGE, title: 'Choose Package', description: 'Select your internet package' },
    { id: FormStep.PERSONAL_DETAILS, title: 'Your Information', description: 'Provide your details' },
    { id: FormStep.CONFIRMATION, title: 'Confirm Order', description: 'Review and confirm' },
];

// Mock data for demonstration
export const mockLocations: Location[] = [
    {
        id: '1',
        name: 'Sandton City',
        city: 'Johannesburg',
        availablePackages: ['basic', 'premium', 'enterprise'],
    },
    {
        id: '2',
        name: 'Cape Town CBD',
        city: 'Cape Town',
        availablePackages: ['basic', 'premium'],
    },
    {
        id: '3',
        name: 'Durban North',
        city: 'Durban',
        availablePackages: ['basic', 'premium', 'enterprise'],
    },
    {
        id: '4',
        name: 'Pretoria East',
        city: 'Pretoria',
        availablePackages: ['basic', 'premium'],
    },
];

export const mockPackages: Package[] = [
    {
        id: 'basic',
        name: 'Basic Fibre',
        speed: '25 Mbps',
        price: 599,
        description: 'Perfect for everyday browsing and streaming',
        features: ['25 Mbps download', '10 Mbps upload', 'Unlimited data', 'Wi-Fi router included'],
    },
    {
        id: 'premium',
        name: 'Premium Fibre',
        speed: '100 Mbps',
        price: 999,
        description: 'Ideal for families and small businesses',
        features: ['100 Mbps download', '50 Mbps upload', 'Unlimited data', 'Wi-Fi router included', 'Priority support'],
    },
    {
        id: 'enterprise',
        name: 'Enterprise Fibre',
        speed: '1 Gbps',
        price: 1999,
        description: 'Ultimate speed for power users and businesses',
        features: ['1 Gbps download', '500 Mbps upload', 'Unlimited data', 'Premium Wi-Fi router', 'Priority support', '24/7 technical support'],
    },
];
