import { createClient } from '@/lib/supabase/server';
import { ShowForm } from '@/components/admin/show-form';

export default async function NewShowPage() {
    const supabase = await createClient();
    const { data: categories } = await supabase.from('categories').select('*').order('name');

    const { data: allShows } = await supabase.from('shows').select('id, title').order('title');

    return <ShowForm categories={categories || []} allShows={allShows || []} />;
}
