import { Skeleton } from "@/components/ui/skeleton";

export default function OnboardingLoading() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 md:p-12">
            <div className="max-w-2xl w-full space-y-8">

                {/* Header Skeleton */}
                <div className="space-y-3">
                    <Skeleton className="h-10 w-2/3" />
                    <Skeleton className="h-5 w-full max-w-md" />
                </div>

                {/* Form Fields Skeleton */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-12 w-full rounded-xl" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-24 w-full rounded-xl" />
                    </div>
                </div>

                {/* Submit Button Skeleton */}
                <Skeleton className="h-14 w-full rounded-2xl" />

            </div>
        </div>
    );
}
