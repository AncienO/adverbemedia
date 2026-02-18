import React from 'react';
import { supabase } from '@/lib/supabase';
import { CompanyDocument } from '@/types';
import { CompanyPageContent } from '@/components/company/company-page-content';

export const revalidate = 0;

export default async function CompanyPage() {
    // Fetch documents from Supabase
    const { data: docsRaw, error } = await supabase
        .from('company_documents')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching company documents:', error);
    }

    // Map DB result to CompanyDocument interface
    const documents: CompanyDocument[] = (docsRaw || []).map((d: any) => ({
        id: d.id,
        title: d.title,
        description: d.description,
        fileUrl: d.file_url,
        fileSize: d.file_size,
        fileFormat: d.file_format,
        category: d.category
    }));

    return <CompanyPageContent documents={documents} />;
}
