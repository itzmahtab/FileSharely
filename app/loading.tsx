import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 md:p-12">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

                {/* Left Side Skeleton */}
                <div className="lg:col-span-4 flex flex-col space-y-12">
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-3/4 md:w-full" />
                        <Skeleton className="h-12 w-1/2 md:w-2/3" />
                        <Skeleton className="h-6 w-full max-w-sm mt-4" />
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </div>
                </div>

                {/* Right Side Skeleton */}
                <div className="lg:col-span-8 flex flex-col items-center space-y-12">
                    <Skeleton className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl" />

                    <div className="w-full max-w-md flex flex-col space-y-4">
                        <Skeleton className="w-full h-16 rounded-2xl" />
                        <Skeleton className="w-full h-16 rounded-2xl" />
                    </div>
                </div>

            </div>
        </div>
    );
}
