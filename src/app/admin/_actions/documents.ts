'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createDocument(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const fileUrl = formData.get('fileUrl') as string;
    const fileSize = formData.get('fileSize') as string;
    const fileFormat = formData.get('fileFormat') as string;
    const category = formData.get('category') as string;

    const { error } = await supabase
        .from('company_documents')
        .insert({ title, description, file_url: fileUrl, file_size: fileSize, file_format: fileFormat, category });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/documents');
    revalidatePath('/company');
    redirect('/admin/documents');
}

export async function updateDocument(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const fileUrl = formData.get('fileUrl') as string;
    const fileSize = formData.get('fileSize') as string;
    const fileFormat = formData.get('fileFormat') as string;
    const category = formData.get('category') as string;

    const { error } = await supabase
        .from('company_documents')
        .update({ title, description, file_url: fileUrl, file_size: fileSize, file_format: fileFormat, category })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/documents');
    revalidatePath('/company');
    redirect('/admin/documents');
}

export async function deleteDocument(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from('company_documents').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/documents');
    revalidatePath('/company');
    redirect('/admin/documents');
}
