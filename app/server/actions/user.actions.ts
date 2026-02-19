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
