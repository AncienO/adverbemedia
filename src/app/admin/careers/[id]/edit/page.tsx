import { createClient } from '@/lib/supabase/server';
import { JobForm } from '@/components/admin/job-form';
import { notFound } from 'next/navigation';

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: job } = await supabase.from('jobs').select('*').eq('id', id).single();
    if (!job) notFound();
    return <JobForm job={job} />;
}
