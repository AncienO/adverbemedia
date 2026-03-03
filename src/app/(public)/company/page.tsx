import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { CompanyDocument } from '@/types';
import { CompanyPageContent } from '@/components/company/company-page-content';

export const revalidate = 0;

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Adverbe Media',
    description: "Adverbe is Ghana's podcast network. Based in Accra, producing original shows that document the conversations worth keeping.",
    keywords: 'Ghana podcast network, Podcast network in Ghana, Ghanaian podcasts, Best podcasts in Ghana, Podcast studio Accra, Podcast advertising Ghana, Sponsor a podcast Ghana, African podcast network, West Africa podcast network, Podcast production Ghana, Audio advertising Ghana',
    alternates: {
        canonical: 'https://adverbemedia.com/company',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/Adverbe%20logo%202.webp',
    },
    appleWebApp: {
        title: 'About | Adverbe Media',
        capable: true,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://adverbemedia.com/company',
        siteName: 'Adverbe Media',
        title: 'About | Adverbe Media',
        description: "Adverbe is Ghana's podcast network. Based in Accra, producing original shows that document the conversations worth keeping.",
        images: [
            {
                url: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp',
                secureUrl: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp',
                width: 2000,
                height: 2000,
                type: 'image/webp',
                alt: 'Adverbe Media Cover',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@theadverbemedia',
        creator: '@theadverbemedia',
        title: 'About | Adverbe Media',
        description: "Adverbe is Ghana's podcast network. Based in Accra, producing original shows that document the conversations worth keeping.",
        images: ['https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp'],
    },
    other: {
        'mobile-web-app-capable': 'yes',
        'script:ld+json': JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Adverbe Media',
            url: 'https://adverbemedia.com/company',
            logo: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp',
            sameAs: [
                'https://x.com/theadverbe',
                'https://www.instagram.com/theadverbe/',
            ],
        }),
    },
};


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
