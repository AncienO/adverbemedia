import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { CompanyDocument } from '@/types';
import { CompanyPageContent } from '@/components/company/company-page-content';

export const revalidate = 0;

export default async function CompanyPage() {
    const supabase = await createClient();

    // Fetch company sections from database
    const { data: sections } = await supabase
        .from('company_sections')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });

    // Fetch documents from Supabase
    const { data: docsRaw } = await supabase
        .from('company_documents')
        .select('*')
        .order('created_at', { ascending: false });

    const documents: CompanyDocument[] = (docsRaw || []).map((d: any) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        fileUrl: d.file_url,
        fileSize: d.file_size,
        fileFormat: d.file_format,
        category: d.category
    }));

    return <CompanyPageContent documents={documents} sections={sections || []} />;
}
