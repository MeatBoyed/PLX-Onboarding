"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Wifi, Package, CheckCircle, Search, CreditCard, AlertTriangle, Loader2, Phone, Mail } from "lucide-react";
import { pluxnetTheme, themeClasses, applyTheme } from "@/lib/theme";
import Image from "next/image";

export default function Home() {
  const [step, setStep] = useState(1);
  const [addressSearching, setAddressSearching] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [formData, setFormData] = useState({
    address: "",
    package: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    standNumber: "",
    wifiName: "",
    wifiPassword: "",
    specialRequests: "",
    acceptTerms: false,
    confirmOrder: false
  });

  const packages = [
    {
      id: "basic",
      name: "Basic Fibre",
      speed: "25 Mbps",
      price: 599,
      description: "Perfect for everyday browsing and streaming",
      features: ["25 Mbps download", "10 Mbps upload", "Unlimited data", "Wi-Fi router included"]
    },
    {
      id: "premium",
      name: "Premium Fibre",
      speed: "100 Mbps",
      price: 999,
      description: "Ideal for families and small businesses",
      features: ["100 Mbps download", "50 Mbps upload", "Unlimited data", "Wi-Fi router included", "Priority support"]
    },
    {
      id: "enterprise",
      name: "Enterprise Fibre",
      speed: "1 Gbps",
      price: 1999,
      description: "Ultimate speed for power users",
      features: ["1 Gbps download", "500 Mbps upload", "Unlimited data", "Premium Wi-Fi router", "Priority support", "24/7 support"]
    }
  ];

  // Mock service areas for demonstration
  const serviceAreas = [
    "Sandton, Johannesburg",
    "Rosebank, Johannesburg",
    "Melrose, Johannesburg",
    "Hyde Park, Johannesburg",
    "Illovo, Johannesburg",
    "Bryanston, Johannesburg",
    "Morningside, Johannesburg",
    "Parktown North, Johannesburg",
    "Craighall, Johannesburg",
    "Dunkeld, Johannesburg"
  ];

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear address error when user starts typing
    if (field === 'address' && addressError) {
      setAddressError("");
    }
  };

  const searchAddress = async () => {
    if (!formData.address.trim()) return;

    setAddressSearching(true);
    setAddressError("");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if address is in service area
    const isServiceable = serviceAreas.some(area =>
      formData.address.toLowerCase().includes(area.split(',')[0].toLowerCase()) ||
      area.toLowerCase().includes(formData.address.toLowerCase())
    );

    setAddressSearching(false);

    if (isServiceable) {
      // Address found - proceed to next step
      setStep(2);
    } else {
      // Address not serviceable
      setAddressError(`Unfortunately, we don't currently service this area. Please contact us at ${pluxnetTheme.branding.supportEmail} or ${pluxnetTheme.branding.supportPhone} for assistance.`);
    }
  };

  const handleAddressKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchAddress();
    }
  };

  const progress = (step / 5) * 100;

  // Apply theme on component mount
  useEffect(() => {
    applyTheme(pluxnetTheme);
  }, []);

  return (
    <div className={`min-h-screen ${themeClasses.backgroundGradient}`}>
      {/* Landing Page Header */}
      <div className="text-center pt-12 pb-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a 
            href={pluxnetTheme.branding.website}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <Image 
              src={pluxnetTheme.images.logo} 
              alt={`${pluxnetTheme.branding.companyName} Logo`}
              width={280}
              height={100}
              className="h-20 w-auto"
              priority
            />
          </a>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Welcome to <span className={themeClasses.primaryText}>{pluxnetTheme.branding.companyName}</span>
        </h1>
        <p className={`text-xl ${themeClasses.textSecondary} mb-2`}>
          {pluxnetTheme.branding.tagline}
        </p>
        
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 text-sm">
          <a 
            href={`mailto:${pluxnetTheme.branding.supportEmail}`}
            className={`flex items-center space-x-2 ${themeClasses.textSecondary} hover:${themeClasses.primaryText} transition-colors`}
          >
            <Mail className="w-4 h-4" />
            <span>{pluxnetTheme.branding.supportEmail}</span>
          </a>
          <a 
            href={`tel:${pluxnetTheme.branding.supportPhone.replace(/\s/g, '')}`}
            className={`flex items-center space-x-2 ${themeClasses.textSecondary} hover:${themeClasses.primaryText} transition-colors`}
          >
            <Phone className="w-4 h-4" />
            <span>{pluxnetTheme.branding.supportPhone}</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4">
        <Card className={`${themeClasses.card} shadow-xl border-0`}>
          <CardContent className={pluxnetTheme.spacing.cardPadding}>
            {/* Progress Bar */}
            <div className="mb-8">
              <Progress value={progress} className="h-2 mb-4" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Step {step} of 5</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>

            {/* Step 1: Address & Location */}
            {step === 1 && (
              <div className={pluxnetTheme.spacing.sectionSpacing}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold tracking-tight">Enter Your Service Address</h2>
                  <p className="text-gray-600 mt-2">Let&apos;s check if we can bring high-speed fibre to your location</p>
                </div>

                {/* Address Search Input */}
                <div className="max-w-2xl mx-auto mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="Enter your street address (e.g., 123 Main Street, Sandton)"
                        value={formData.address}
                        onChange={(e) => updateFormData('address', e.target.value)}
                        onKeyPress={handleAddressKeyPress}
                        className="text-lg py-3 pr-12"
                        disabled={addressSearching}
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <Button
                      onClick={searchAddress}
                      disabled={!formData.address.trim() || addressSearching}
                      className={`px-6 py-3 ${themeClasses.primaryButton}`}
                    >
                      {addressSearching ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Search
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Address Error */}
                  {addressError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-red-800 mb-3">{addressError}</p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <a
                              href={`mailto:${pluxnetTheme.branding.supportEmail}`}
                              className="inline-flex items-center text-sm text-red-700 hover:text-red-900 underline transition-colors"
                            >
                              <Mail className="w-4 h-4 mr-1" />
                              {pluxnetTheme.branding.supportEmail}
                            </a>
                            <a
                              href={`tel:${pluxnetTheme.branding.supportPhone.replace(/\s/g, '')}`}
                              className="inline-flex items-center text-sm text-red-700 hover:text-red-900 underline transition-colors"
                            >
                              <Phone className="w-4 h-4 mr-1" />
                              {pluxnetTheme.branding.supportPhone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service Area Suggestions */}
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-3">Available service areas include:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {serviceAreas.slice(0, 6).map((area, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            updateFormData('address', area);
                          }}
                          className="text-left text-sm p-2 rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                          disabled={addressSearching}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Google Maps Placeholder */}
                <div className="max-w-4xl mx-auto">
                  <div className="relative bg-gray-100 rounded-lg border-2 border-gray-200 h-64 md:h-80 overflow-hidden">
                    {/* Google Maps Logo */}
                    <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1 rounded shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded"></div>
                        <span className="text-sm font-medium text-gray-700">Google Maps</span>
                      </div>
                    </div>

                    {/* Map Grid Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-8 h-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className="border border-gray-300"></div>
                        ))}
                      </div>
                    </div>

                    {/* Center Location Pin */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className={`w-8 h-8 ${themeClasses.primaryBg} rounded-full flex items-center justify-center shadow-lg`}>
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute bottom-4 right-4 space-y-2">
                      <div className="bg-white rounded shadow p-1">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600 text-sm font-medium">+</div>
                      </div>
                      <div className="bg-white rounded shadow p-1">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600 text-sm font-medium">-</div>
                      </div>
                    </div>

                    {/* Address Overlay */}
                    {formData.address && (
                      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{formData.address}</p>
                            <p className="text-xs text-gray-600">
                              {addressSearching ? "Checking availability..." : "Click Search to verify"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Package Selection */}
            {step === 2 && (
              <div className={pluxnetTheme.spacing.sectionSpacing}>
                <div className="text-center">
                  <h2 className="text-2xl font-bold tracking-tight">Choose Your Internet Package</h2>
                  <p className="text-gray-600 mt-2">Select the perfect plan for your needs</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {packages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`cursor-pointer ${pluxnetTheme.animations.transition} ${themeClasses.cardHover} border-2 relative ${
                        formData.package === pkg.id 
                          ? `${themeClasses.primaryBorder} ${themeClasses.primaryBg}/5` 
                          : 'border-gray-200 hover:border-gray-300'
                      } ${pkg.id === 'premium' ? 'ring-2 ring-purple-200' : ''}`}
                      onClick={() => updateFormData('package', pkg.id)}
                    >
                      {pkg.id === 'premium' && (
                        <Badge className={`absolute -top-2 left-1/2 transform -translate-x-1/2 ${themeClasses.accentBg} text-white`}>
                          Most Popular
                        </Badge>
                      )}
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${themeClasses.primaryBg}/10`}>
                                <Package className={`w-6 h-6 ${themeClasses.primaryText}`} />
                              </div>
                              <h3 className="text-xl font-bold">{pkg.name}</h3>
                            </div>
                            {formData.package === pkg.id && (
                              <div className={`p-1 rounded-full ${themeClasses.primaryBg}`}>
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="text-center py-2">
                            <div className={`text-3xl font-bold ${themeClasses.primaryText}`}>
                              R{pkg.price}
                            </div>
                            <span className="text-sm font-normal text-gray-600">/month</span>
                            <div className={`text-lg font-semibold ${themeClasses.accentText} mt-1`}>
                              {pkg.speed}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 text-center">{pkg.description}</p>

                          {/* Features List */}
                          <div className="space-y-2 pt-2">
                            {pkg.features.slice(0, 4).map((feature, index) => (
                              <div key={index} className="flex items-center text-sm">
                                <CheckCircle className={`w-4 h-4 ${themeClasses.successText} mr-3 flex-shrink-0`} />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="min-w-[120px]"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!formData.package}
                    className={`min-w-[120px] ${themeClasses.primaryButton}`}
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Personal Details */}
            {step === 3 && (
              <div className={pluxnetTheme.spacing.sectionSpacing}>
                <div className="text-center">
                  <h2 className="text-2xl font-bold tracking-tight">Your Information</h2>
                  <p className="text-gray-600 mt-2">Please provide your details to complete the setup</p>
                </div>

                <div className="grid gap-6">
                  {/* Personal Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <span>Personal Details</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Contact Number</Label>
                        <Input
                          id="phone"
                          placeholder="+27 11 123 4567"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Installation Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>Installation Details</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="streetAddress">Complete Street Address</Label>
                        <Input
                          id="streetAddress"
                          placeholder="123 Main Street, Suburb, City"
                          value={formData.streetAddress}
                          onChange={(e) => updateFormData('streetAddress', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="standNumber">Stand/Unit Number</Label>
                        <Input
                          id="standNumber"
                          placeholder="e.g., 123 or 123A"
                          value={formData.standNumber}
                          onChange={(e) => updateFormData('standNumber', e.target.value)}
                        />
                      </div>
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
                    <CardContent className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="wifiName">Wi-Fi Network Name</Label>
                        <Input
                          id="wifiName"
                          placeholder="e.g., PluxNet_Home"
                          value={formData.wifiName}
                          onChange={(e) => updateFormData('wifiName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wifiPassword">Wi-Fi Password</Label>
                        <Input
                          id="wifiPassword"
                          type="password"
                          placeholder="Minimum 8 characters"
                          value={formData.wifiPassword}
                          onChange={(e) => updateFormData('wifiPassword', e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Details */}
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="specialRequests">Special Installation Requests (Optional)</Label>
                        <textarea
                          id="specialRequests"
                          className="w-full p-3 border rounded-md resize-none"
                          placeholder="Any special installation requirements or requests..."
                          rows={3}
                          value={formData.specialRequests}
                          onChange={(e) => updateFormData('specialRequests', e.target.value)}
                        />
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => updateFormData('acceptTerms', checked as boolean)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="acceptTerms" className="text-sm font-medium">
                            I accept the Terms & Conditions
                          </Label>
                          <p className="text-xs text-gray-500">
                            By checking this box, you confirm that you have read and agree to our{' '}
                            <a href="#" className={`${themeClasses.primaryText} hover:underline`}>
                              terms and conditions
                            </a>.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="min-w-[120px]"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setStep(4)}
                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.acceptTerms}
                    className={`min-w-[120px] ${themeClasses.primaryButton}`}
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Order Confirmation & Payment Warning */}
            {step === 4 && (
              <div className={pluxnetTheme.spacing.sectionSpacing}>
                <div className="text-center">
                  <h2 className="text-2xl font-bold tracking-tight">Confirm Your Order</h2>
                  <p className="text-gray-600 mt-2">Please review your order details carefully before proceeding</p>
                </div>

                {/* Payment Warning */}
                <Card className="border-2 border-orange-200 bg-orange-50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-orange-900 mb-2">Important Notice</h3>
                        <p className="text-sm text-orange-800 mb-3">
                          Once you confirm this order, you will be redirected to complete payment and the order cannot be modified.
                          Please ensure all details are correct before proceeding.
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-orange-700">
                          <CreditCard className="w-4 h-4" />
                          <span>Secure payment required to complete order</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-6">
                  {/* Service Location */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>Service Location</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="font-medium">{formData.address}</p>
                        {formData.streetAddress && (
                          <p className="text-sm text-gray-600">Installation: {formData.streetAddress}</p>
                        )}
                        {formData.standNumber && (
                          <p className="text-sm text-gray-600">Unit: {formData.standNumber}</p>
                        )}
                      </div>
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
                      {(() => {
                        const selectedPkg = packages.find(p => p.id === formData.package);
                        return selectedPkg ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-semibold">{selectedPkg.name}</h3>
                                <p className="text-gray-600">{selectedPkg.description}</p>
                              </div>
                              <div className="text-right">
                                <p className={`text-2xl font-bold ${themeClasses.primaryText}`}>
                                  R{selectedPkg.price}
                                </p>
                                <p className="text-sm text-gray-600">per month</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">{selectedPkg.speed}</Badge>
                              <Badge variant="outline">Unlimited Data</Badge>
                            </div>
                            <ul className="grid grid-cols-2 gap-2 text-sm">
                              {selectedPkg.features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                  <CheckCircle className={`w-3 h-3 ${themeClasses.successText} mr-2`} />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null;
                      })()}
                    </CardContent>
                  </Card>

                  {/* Customer Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-gray-600">Full Name</p>
                          <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email Address</p>
                          <p className="font-medium">{formData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Contact Number</p>
                          <p className="font-medium">{formData.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Wi-Fi Network</p>
                          <p className="font-medium">{formData.wifiName}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Special Requests */}
                  {formData.specialRequests && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Special Installation Requests</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{formData.specialRequests}</p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Final Confirmation */}
                  <Card className={`border-2 ${themeClasses.primaryBorder}/20`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="confirmOrder"
                          checked={formData.confirmOrder}
                          onCheckedChange={(checked) => updateFormData('confirmOrder', checked as boolean)}
                          className="mt-1"
                        />
                        <div className="space-y-2">
                          <Label htmlFor="confirmOrder" className="text-sm font-medium leading-relaxed">
                            I confirm that all information provided is accurate and I authorize PluxNet to proceed with this order.
                            I understand that payment will be required to complete the installation process.
                          </Label>
                          <p className="text-xs text-gray-500">
                            By confirming, you agree to our service terms and authorize the installation at the specified address.
                            This order cannot be modified after payment.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(3)}
                    className="min-w-[120px]"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setStep(5)}
                    disabled={!formData.confirmOrder}
                    className={`min-w-[160px] ${themeClasses.primaryButton}`}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Order Confirmed */}
            {step === 5 && (
              <div className={pluxnetTheme.spacing.sectionSpacing}>
                <div className="text-center">
                  <div className={`mx-auto w-16 h-16 ${themeClasses.successBg}/10 rounded-full flex items-center justify-center mb-6`}>
                    <CheckCircle className={`w-8 h-8 ${themeClasses.successText}`} />
                  </div>
                  <h2 className={`text-2xl font-bold ${themeClasses.successText}`}>Order Confirmed!</h2>
                  <p className="text-gray-600 mt-2">
                    Thank you for choosing {pluxnetTheme.branding.companyName}. We&apos;ll be in touch soon to schedule your installation.
                  </p>
                </div>

                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-gray-600">Service Address</p>
                        <p className="font-medium">{formData.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Package</p>
                        <p className="font-medium">
                          {packages.find(p => p.id === formData.package)?.name} -
                          R{packages.find(p => p.id === formData.package)?.price}/month
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Customer</p>
                        <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Contact</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className={`border-2 ${themeClasses.primaryBorder}/20 bg-blue-50`}>
                  <CardHeader>
                    <CardTitle>What happens next?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-left">
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full ${themeClasses.primaryBg}/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <span className={`text-xs font-semibold ${themeClasses.primaryText}`}>1</span>
                      </div>
                      <p className="text-sm">We&apos;ll contact you within 24 hours to confirm your installation details</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full ${themeClasses.primaryBg}/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <span className={`text-xs font-semibold ${themeClasses.primaryText}`}>2</span>
                      </div>
                      <p className="text-sm">Our team will schedule a convenient installation time with you</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full ${themeClasses.primaryBg}/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <span className={`text-xs font-semibold ${themeClasses.primaryText}`}>3</span>
                      </div>
                      <p className="text-sm">Professional installation and setup of your high-speed fibre connection</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button
                    onClick={() => {
                      setStep(1);
                      setFormData({
                        address: "", package: "", firstName: "", lastName: "", email: "", phone: "",
                        streetAddress: "", standNumber: "", wifiName: "", wifiPassword: "",
                        specialRequests: "", acceptTerms: false, confirmOrder: false
                      });
                    }}
                    className={themeClasses.secondaryButton}
                  >
                    Start New Order
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-sm">
          <p className={themeClasses.textSecondary}>
            Need help? Contact our support team at{" "}
            <a 
              href={`mailto:${pluxnetTheme.branding.supportEmail}`} 
              className={`${themeClasses.primaryText} hover:underline transition-colors`}
            >
              {pluxnetTheme.branding.supportEmail}
            </a>{" "}
            or{" "}
            <a 
              href={`tel:${pluxnetTheme.branding.supportPhone.replace(/\s/g, '')}`} 
              className={`${themeClasses.primaryText} hover:underline transition-colors`}
            >
              {pluxnetTheme.branding.supportPhone}
            </a>
          </p>
        </div>
        </main>
    </div>
  );
}
