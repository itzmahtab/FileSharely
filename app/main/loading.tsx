import { Skeleton } from "@/components/ui/skeleton";

export default function MainLoading() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            {/* Navbar Skeleton */}
            <div className="w-full border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
                <Skeleton className="h-7 w-32 rounded-lg" />
                <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6">

                {/* Upload Button Skeleton */}
                <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                    <Skeleton className="h-48 w-full rounded-3xl" />
                    <Skeleton className="h-14 w-56 rounded-2xl" />
                </div>

                {/* Recent Files Skeleton */}
                <div className="w-full max-w-lg space-y-3 mt-4">
                    <Skeleton className="h-5 w-32" />
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                            <Skeleton className="h-8 w-16 rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
