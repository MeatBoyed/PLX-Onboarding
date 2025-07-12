import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    steps: Array<{ title: string; description: string }>;
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="w-full mb-8">
            {/* Progress Bar */}
            <div className="mb-6">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>Step {currentStep + 1} of {totalSteps}</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
            </div>

            {/* Step Indicators */}
            <div className="relative flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 relative">
                        {/* Step Circle */}
                        <div
                            className={cn(
                                "w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium relative z-10 bg-background",
                                index < currentStep
                                    ? "bg-primary border-primary text-primary-foreground"
                                    : index === currentStep
                                        ? "border-primary text-primary bg-background"
                                        : "border-muted-foreground/30 text-muted-foreground bg-background"
                            )}
                        >
                            {index < currentStep ? (
                                <Check className="w-5 h-5" />
                            ) : (
                                <span>{index + 1}</span>
                            )}
                        </div>

                        {/* Step Info */}
                        <div className="mt-2 text-center">
                            <div
                                className={cn(
                                    "text-sm font-medium",
                                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {step.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 hidden sm:block">
                                {step.description}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Connector Lines */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted-foreground/30 -z-10" />
                <div
                    className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-300 -z-10"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
            </div>
        </div>
        // </div>
    );
}
