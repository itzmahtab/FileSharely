'use server';

import prisma from '@/lib/prisma';

export type ClerkUserWebhookData = {
    id: string;
    email_addresses: { email_address: string }[];
    first_name?: string | null;
    last_name?: string | null;
    username?: string | null;
};

/**
 * Creates a new user or updates an existing one based on Clerk webhook data.
 * @param data - The user data received from Clerk.
 */
export async function createOrUpdateUser(data: ClerkUserWebhookData) {
    try {
        const { id, email_addresses, first_name, last_name, username } = data;

        const email = email_addresses[0]?.email_address;
        const name = `${first_name || ''} ${last_name || ''}`.trim() || username || 'User';
        const finalUsername = username || email.split('@')[0];

        const user = await prisma.user.upsert({
            where: { clerkUserId: id },
            update: {
                email,
                name,
                username: finalUsername,
            },
            create: {
                clerkUserId: id,
                email,
                name,
                username: finalUsername,
                onboarded: false,
            },
        });

        return user;
    } catch (error) {
        console.error('Error in createOrUpdateUser:', error);
        throw new Error(`Failed to create or update user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Deletes a user from the database.
 * @param clerkUserId - The unique Clerk user ID.
 */
export async function deleteUser(clerkUserId: string) {
    try {
        await prisma.user.delete({
            where: { clerkUserId },
        });
    } catch (error) {
        console.error('Error in deleteUser:', error);
        throw new Error(`Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

/**
 * Retrieves a user from the database by their Clerk user ID.
 * @param clerkUserId - The unique Clerk user ID.
 */
export async function getUser(clerkUserId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { clerkUserId },
        });
        return user;
    } catch (error) {
        console.error('Error in getUser:', error);
        throw new Error(`Failed to get user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export type OnboardingData = {
    name: string;
    email: string;
    username: string;
};

/**
 * Onboards an existing user by updating their profile data.
 * @param clerkUserId - The unique Clerk user ID.
 * @param data - The onboarding form data.
 */
export async function onboardUser(clerkUserId: string, data: OnboardingData) {
    try {
        const { onboardingFormSchema } = await import('@/app/onboarding/validations/onboarding');

        const result = onboardingFormSchema.safeParse(data);

        if (!result.success) {
            return {
                success: false,
                message: result.error.issues[0].message,
            };
        }

        const updatedUser = await prisma.user.update({
            where: { clerkUserId },
            data: {
                name: result.data.name,
                email: result.data.email,
                username: result.data.username,
                onboarded: true,
            },
        });

        return {
            success: true,
            user: updatedUser,
        };
    } catch (error) {
        console.error('Error in onboardUser:', error);
        return {
            success: false,
            message: `Failed to onboard user: ${error instanceof Error ? error.message : 'Unknown error'}`,
        };
    }
}
