import { createClient } from '@/lib/supabase/server';
import { EpisodeForm } from '@/components/admin/episode-form';
import { notFound } from 'next/navigation';

export default async function EditEpisodePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: episode } = await supabase.from('episodes').select('*').eq('id', id).single();
    if (!episode) notFound();

    const { data: shows } = await supabase.from('shows').select('id, title').order('title');
    return <EpisodeForm episode={episode} shows={shows || []} />;
}
