'use server';

import { createClient } from '@/lib/supabase/server';

export async function uploadFile(formData: FormData) {
    const supabase = await createClient();

    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string || 'uploads';
    const folder = formData.get('folder') as string || '';

    if (!file) {
        return { error: 'No file provided' };
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${folder ? folder + '/' : ''}${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        return { error: error.message };
    }

    const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

    return { url: urlData.publicUrl };
}
