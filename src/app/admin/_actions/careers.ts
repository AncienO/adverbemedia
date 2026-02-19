'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createJob(formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const location = formData.get('location') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;
    const requirements = formData.get('requirements') as string;
    const isActive = formData.get('isActive') === 'true';

    const { error } = await supabase
        .from('jobs')
        .insert({ title, slug, location, type, description, requirements, is_active: isActive });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/careers');
    revalidatePath('/careers');
    redirect('/admin/careers');
}

export async function updateJob(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const location = formData.get('location') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;
    const requirements = formData.get('requirements') as string;
    const isActive = formData.get('isActive') === 'true';

    const { error } = await supabase
        .from('jobs')
        .update({ title, slug, location, type, description, requirements, is_active: isActive })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/careers');
    revalidatePath('/careers');
    redirect('/admin/careers');
}

export async function toggleJobActive(id: string, isActive: boolean) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('jobs')
        .update({ is_active: !isActive })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/careers');
    revalidatePath('/careers');
}

export async function deleteJob(id: string) {
    const supabase = await createClient();

    const { error } = await supabase.from('jobs').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin/careers');
    revalidatePath('/careers');
    redirect('/admin/careers');
}
