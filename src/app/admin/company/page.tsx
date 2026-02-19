import { createClient } from '@/lib/supabase/server';
import { CompanySectionEditor } from '@/components/admin/company-section-editor';

export default async function AdminCompanyPage() {
    const supabase = await createClient();
    const { data: sections } = await supabase
        .from('company_sections')
        .select('*')
        .order('sort_order', { ascending: true });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-gray-900">Company</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage company information, facts, and text sections</p>
                </div>
            </div>
            <CompanySectionEditor initialSections={sections || []} />
        </div>
    );
}
