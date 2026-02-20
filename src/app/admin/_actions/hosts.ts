'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getHosts() {
    const supabase = await createClient();
    const { data: hosts, error } = await supabase
        .from('hosts')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching hosts:', error);
        return [];
    }

    return hosts || [];
}

export async function getHost(id: string) {
    const supabase = await createClient();
    const { data: host, error } = await supabase
        .from('hosts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching host:', error);
        return null;
    }

    return host;
}

export async function createHost(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const role = formData.get('role') as string;
    const avatarUrl = formData.get('avatar') as string;

    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;
    const linkedin = formData.get('linkedin') as string;

    const socialLinks: Record<string, string> = {};
    if (twitter) socialLinks.twitter = twitter;
    if (instagram) socialLinks.instagram = instagram;
    if (linkedin) socialLinks.linkedin = linkedin;

    const { error } = await supabase
        .from('hosts')
        .insert({
            name,
            bio,
            role,
            avatar_url: avatarUrl,
            social_links: socialLinks,
        });

    if (error) {
        console.error('Error creating host:', error);
        return { success: false, error: 'Failed to create host.' };
    }

    revalidatePath('/admin/hosts');
    revalidatePath('/admin/shows');
    return { success: true };
}

export async function updateHost(id: string, formData: FormData) {
    const supabase = await createClient();

    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const role = formData.get('role') as string;
    const avatarUrl = formData.get('avatar') as string;

    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;
    const linkedin = formData.get('linkedin') as string;

    const socialLinks: Record<string, string> = {};
    if (twitter) socialLinks.twitter = twitter;
    if (instagram) socialLinks.instagram = instagram;
    if (linkedin) socialLinks.linkedin = linkedin;

    const { error } = await supabase
        .from('hosts')
        .update({
            name,
            bio,
            role,
            avatar_url: avatarUrl,
            social_links: socialLinks,
        })
        .eq('id', id);

    if (error) {
        console.error('Error updating host:', error);
        return { success: false, error: 'Failed to update host.' };
    }

    revalidatePath('/admin/hosts');
    revalidatePath('/admin/shows');
    // Also revalidate the public show pages since host details might have changed
    // In a real scenario you might revalidate specific show paths, but layout reval is safer
    revalidatePath('/(public)/shows', 'layout');
    return { success: true };
}

export async function deleteHost(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('hosts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting host:', error);
        return { success: false, error: 'Failed to delete host. It might be assigned to a show.' };
    }

    revalidatePath('/admin/hosts');
    revalidatePath('/admin/shows');
    revalidatePath('/(public)/shows', 'layout');
    return { success: true };
}
