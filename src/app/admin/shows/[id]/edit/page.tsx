import { createClient } from '@/lib/supabase/server';
import { ShowForm } from '@/components/admin/show-form';
import { notFound } from 'next/navigation';

export default async function EditShowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: show } = await supabase.from('shows').select('*').eq('id', id).single();
    if (!show) notFound();

    const { data: categories } = await supabase.from('categories').select('*').order('name');

    // Fetch hosts for this show
    const { data: showHosts } = await supabase
        .from('show_hosts')
        .select('hosts(*)')
        .eq('show_id', id);

    const hosts = showHosts?.map((sh: any) => sh.hosts) || [];

    const { data: allShows } = await supabase.from('shows').select('id, title').order('title');

    return <ShowForm show={show} categories={categories || []} hosts={hosts} allShows={allShows || []} />;
}
