'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function markAsRead(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('contacts').update({ is_read: true }).eq('id', id);
    if (error) return { error: error.message };
    revalidatePath('/admin/contacts');
}

export async function deleteContact(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (error) return { error: error.message };
    revalidatePath('/admin/contacts');
}
