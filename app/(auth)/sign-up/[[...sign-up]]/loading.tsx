import { Skeleton } from "@/components/ui/skeleton";

export default function SignUpLoading() {
    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md space-y-8 p-8 border rounded-xl shadow-sm">
                <div className="space-y-3 text-center">
                    <Skeleton className="h-8 w-48 mx-auto" />
                    <Skeleton className="h-4 w-64 mx-auto" />
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <div className="flex items-center justify-center space-x-2 pt-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-12" />
                </div>
            </div>
        </div>
    );
}
