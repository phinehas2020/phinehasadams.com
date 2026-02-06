'use server'

import { addWebsite, deleteWebsite } from '@/lib/websites';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createWebsiteAction(formData: FormData) {
    const url = formData.get('url') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!url || !title) {
        throw new Error('Missing required fields');
    }

    // Basic URL validation
    let formattedUrl = url;
    if (!url.startsWith('http')) {
        formattedUrl = `https://${url}`;
    }

    await addWebsite(formattedUrl, title, description);
    revalidatePath('/websites-for-sale');
    revalidatePath('/admin');
}

export async function deleteWebsiteAction(id: string) {
    await deleteWebsite(id);
    revalidatePath('/websites-for-sale');
    revalidatePath('/admin');
}

export async function loginAction(prevState: any, formData: FormData) {
    const password = formData.get('password') as string;
    // Simple env var check, fallback to a default for initial setup
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
        const cookieStore = await cookies();
        // Await the set() call
        await cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return { success: true };
    }

    return { success: false, error: 'Invalid password' };
}
