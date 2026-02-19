import { createClient } from '@/lib/supabase/server';
import { EpisodeForm } from '@/components/admin/episode-form';

export default async function NewEpisodePage() {
    const supabase = await createClient();
    const { data: shows } = await supabase.from('shows').select('id, title').order('title');
    return <EpisodeForm shows={shows || []} />;
}
