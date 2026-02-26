'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function subscribeToNewsletter(email: string) {
    const supabase = await createAdminClient();

    const { error } = await supabase.from('newsletter_subscribers').insert({
        email: email
    });

    if (error) {
        // If it's a unique constraint error, they are already subscribed — treat as success.
        if (error.code === '23505') {
            return { success: true, message: 'Already subscribed!' };
        }

        return { error: error.message };
    }

    revalidatePath('/admin/newsletter');
    return { success: true };
}
