import { z } from "zod";

export const onboardingFormSchema = z.object({
    name: z.string().min(1).max(50),
    username: z
        .string()
        .trim()
        .toLowerCase()
        .min(1)
        .max(50)
        .regex(/^[a-z0-9_-]+$/, {
            message: "Username can only contain lowercase letters, numbers, hyphens, and underscores.",
        }),
    email: z.email({ pattern: z.regexes.email }),
});

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
