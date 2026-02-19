import { createClient } from '@/lib/supabase/server';
import { SettingsEditor } from '@/components/admin/settings-editor';

export default async function AdminSettingsPage() {
    const supabase = await createClient();
    const { data: socialLinks } = await supabase
        .from('social_links')
        .select('*')
        .order('sort_order', { ascending: true });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-serif text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500 mt-1">Manage global site settings and social links</p>
            </div>
            <SettingsEditor initialLinks={socialLinks || []} />
        </div>
    );
}
