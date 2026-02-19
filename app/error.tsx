"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function RootError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center space-y-8">
                <div className="flex justify-center">
                    <div className="p-4 bg-red-50 rounded-full">
                        <AlertCircle className="w-12 h-12 text-red-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Something went wrong</h1>
                    <p className="text-slate-600">
                        An unexpected error occurred. We've been notified and are looking into it.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => reset()}
                        className="w-full py-7 text-lg bg-blue-600 hover:bg-blue-700 transition-all font-bold rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => window.location.href = "/"}
                        className="w-full py-7 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all font-bold rounded-2xl flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Button>
                </div>

                {error.digest && (
                    <p className="text-xs text-slate-400 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}
