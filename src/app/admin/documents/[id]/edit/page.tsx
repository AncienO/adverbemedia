import { createClient } from '@/lib/supabase/server';
import { DocumentForm } from '@/components/admin/document-form';
import { notFound } from 'next/navigation';

export default async function EditDocumentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: document } = await supabase.from('company_documents').select('*').eq('id', id).single();
    if (!document) notFound();
    return <DocumentForm document={document} />;
}
