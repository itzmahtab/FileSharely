"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function SignUpError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
            <div className="max-w-md w-full space-y-6 bg-white p-10 rounded-2xl shadow-xl border border-red-50">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900">Registration Error</h2>
                    <p className="text-slate-600">
                        There was a problem setting up your account. Please try the sign-up process again.
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => reset()}
                        className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all rounded-xl shadow-lg shadow-blue-100"
                    >
                        Try Again
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => window.location.href = "/"}
                        className="w-full text-slate-500 hover:text-slate-700"
                    >
                        Go back home
                    </Button>
                </div>
            </div>
        </div>
    );
}
