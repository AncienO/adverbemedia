'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function subscribeToNewsletter(email: string) {
    const supabase = await createClient();

    const { error } = await supabase.from('subscribers').insert({
        email: email
    });

    if (error) {
        // If it's a unique constraint error, it means they are already subscribed. That's fine.
        if (error.code === '23505') {
            return { success: true, message: 'Already subscribed!' };
        }

        // Fallback: If 'subscribers' table is missing remotely, save as a Contact
        if (error.code === '42P01' || error.message?.includes('schema cache')) {
            const { error: fallbackError } = await supabase.from('contacts').insert({
                first_name: 'Newsletter',
                last_name: 'Subscriber',
                email: email,
                subject: 'Newsletter Subscription',
                message: 'Auto-saved via fallback from Newsletter trigger.'
            });
            if (fallbackError) return { error: fallbackError.message };
            revalidatePath('/admin/contacts');
            return { success: true };
        }

        return { error: error.message };
    }

    revalidatePath('/admin/contacts');
    return { success: true };
}
