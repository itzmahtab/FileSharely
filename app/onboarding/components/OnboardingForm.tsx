"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    onboardingFormSchema,
    type OnboardingFormData,
} from "@/app/onboarding/validations/onboarding";
import { onboardUser } from "@/app/server/actions/user.actions";
import { Button } from "@/components/ui/button";

type OnboardingFormProps = {
    user: {
        clerkUserId: string;
        name: string;
        email: string;
        username: string;
    };
    className?: string;
};

export default function OnboardingForm({ user, className }: OnboardingFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<OnboardingFormData>({
        resolver: zodResolver(onboardingFormSchema),
        defaultValues: {
            name: user.name ?? "",
            username: user.username ?? "",
            email: user.email ?? "",
        },
    });

    const onSubmit = async (data: OnboardingFormData) => {
        try {
            await onboardUser(user.clerkUserId, data);

            toast.success("Welcome to FileSharely!", {
                description: "Your account is all set up. Let's get started!",
                position: "top-center",
                style: {
                    background: "#EFF6FF",
                    border: "1px solid #3B82F6",
                    color: "#1E3A8A",
                },
            });

            router.push("/main");
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={`flex min-h-screen items-center justify-center bg-gray-50 px-4 ${className}`}>
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    Complete your profile
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                    Tell us a bit about yourself to get started.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register("name")}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Your full name"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            {...register("username")}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="your-username"
                        />
                        {errors.username && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? "Saving..." : "Complete Onboarding"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
