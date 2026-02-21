import { createClient } from '@/lib/supabase/server';
import { LinksManagement } from '@/components/admin/links-management';

export default async function AdminLinksPage() {
    const supabase = await createClient();

    // Fetch all shows
    const { data: shows } = await supabase
        .from('shows')
        .select('id, title, social_links')
        .order('title');

    // Fetch global social links (footer)
    const { data: globalLinks } = await supabase
        .from('social_links')
        .select('*')
        .order('sort_order', { ascending: true });

    return (
        <LinksManagement
            shows={shows || []}
            globalLinks={globalLinks || []}
        />
    );
}
