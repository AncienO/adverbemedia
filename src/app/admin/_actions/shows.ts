'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createShow(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const description = formData.get('description') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const coverImageUrl = formData.get('coverImageUrl') as string;
    const categoryId = formData.get('categoryId') as string;
    const status = formData.get('status') as string || 'coming-soon';
    const spotify = formData.get('spotify') as string;
    const youtube = formData.get('youtube') as string;
    const applePodcasts = formData.get('applePodcasts') as string;
    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;

    const socialLinks: Record<string, string> = {};
    if (spotify) socialLinks.spotify = spotify;
    if (youtube) socialLinks.youtube = youtube;
    if (applePodcasts) socialLinks.applePodcasts = applePodcasts;
    if (twitter) socialLinks.twitter = twitter;
    if (instagram) socialLinks.instagram = instagram;

    const { data: show, error } = await supabase
        .from('shows')
        .insert({
            title,
            slug,
            description,
            short_description: shortDescription,
            cover_image_url: coverImageUrl,
            category_id: categoryId || null,
            status,
            social_links: socialLinks,
        })
        .select()
        .single();

    if (error) {
        return { error: error.message };
    }

    // Handle host
    const hostName = formData.get('hostName') as string;
    const hostRole = formData.get('hostRole') as string;
    const hostAvatarUrl = formData.get('hostAvatarUrl') as string;

    if (hostName) {
        const { data: host, error: hostError } = await supabase
            .from('hosts')
            .insert({ name: hostName, role: hostRole || 'Host', avatar_url: hostAvatarUrl })
            .select()
            .single();

        if (!hostError && host) {
            await supabase.from('show_hosts').insert({ show_id: show.id, host_id: host.id });
        }
    }

    // Handle co-hosts (comma-separated)
    const coHosts = formData.get('coHosts') as string;
    if (coHosts) {
        const names = coHosts.split(',').map(n => n.trim()).filter(Boolean);
        for (const name of names) {
            const { data: coHost } = await supabase
                .from('hosts')
                .insert({ name, role: 'Co-Host' })
                .select()
                .single();
            if (coHost) {
                await supabase.from('show_hosts').insert({ show_id: show.id, host_id: coHost.id });
            }
        }
    }

    revalidatePath('/admin/shows');
    revalidatePath('/shows');
    redirect('/admin/shows');
}

export async function updateShow(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const coverImageUrl = formData.get('coverImageUrl') as string;
    const categoryId = formData.get('categoryId') as string;
    const status = formData.get('status') as string;
    const spotify = formData.get('spotify') as string;
    const youtube = formData.get('youtube') as string;
    const applePodcasts = formData.get('applePodcasts') as string;
    const twitter = formData.get('twitter') as string;
    const instagram = formData.get('instagram') as string;

    const socialLinks: Record<string, string> = {};
    if (spotify) socialLinks.spotify = spotify;
    if (youtube) socialLinks.youtube = youtube;
    if (applePodcasts) socialLinks.applePodcasts = applePodcasts;
    if (twitter) socialLinks.twitter = twitter;
    if (instagram) socialLinks.instagram = instagram;

    const { error } = await supabase
        .from('shows')
        .update({
            title,
            slug,
            description,
            short_description: shortDescription,
            cover_image_url: coverImageUrl,
            category_id: categoryId || null,
            status,
            social_links: socialLinks,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/shows');
    revalidatePath('/shows');
    revalidatePath(`/shows/${slug}`);
    redirect('/admin/shows');
}

export async function deleteShow(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from('shows').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/shows');
    revalidatePath('/shows');
    redirect('/admin/shows');
}
