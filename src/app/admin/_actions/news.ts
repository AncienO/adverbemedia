'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createArticle(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const coverImageUrl = formData.get('coverImageUrl') as string;
    const authorName = formData.get('authorName') as string;
    const publishedAt = formData.get('publishedAt') as string;
    const isPublished = formData.get('isPublished') === 'true';

    const { error } = await supabase
        .from('news_articles')
        .insert({
            title, slug, content, excerpt,
            cover_image_url: coverImageUrl,
            author_name: authorName,
            published_at: publishedAt || new Date().toISOString(),
            is_published: isPublished,
        });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/news');
    revalidatePath('/news');
    redirect('/admin/news');
}

export async function updateArticle(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const coverImageUrl = formData.get('coverImageUrl') as string;
    const authorName = formData.get('authorName') as string;
    const publishedAt = formData.get('publishedAt') as string;
    const isPublished = formData.get('isPublished') === 'true';

    const { error } = await supabase
        .from('news_articles')
        .update({
            title, slug, content, excerpt,
            cover_image_url: coverImageUrl,
            author_name: authorName,
            published_at: publishedAt,
            is_published: isPublished,
        })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/news');
    revalidatePath('/news');
    redirect('/admin/news');
}

export async function deleteArticle(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from('news_articles').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/news');
    revalidatePath('/news');
    redirect('/admin/news');
}
