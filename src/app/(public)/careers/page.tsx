import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { Job } from '@/types';
import { CareersPageContent } from '@/components/careers/careers-page-content';
import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
    title: 'Careers | Adverbe Media',
    description: "Join the team building Ghana's most original podcast network, and leave your mark on the stories worth telling.",
    alternates: {
        canonical: 'https://adverbemedia.com/careers',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/Adverbe%20logo%202.webp',
    },
    appleWebApp: {
        title: 'Careers | Adverbe Media',
        capable: true,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://adverbemedia.com/careers',
        siteName: 'Adverbe Media',
        title: 'Careers | Adverbe Media',
        description: "Join the team building Ghana's most original podcast network, and leave your mark on the stories worth telling.",
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
        title: 'Careers | Adverbe Media',
        description: "Join the team building Ghana's most original podcast network, and leave your mark on the stories worth telling.",
        images: ['https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp'],
    },
    other: {
        'mobile-web-app-capable': 'yes',
        'script:ld+json': JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'Organization',
                    name: 'Adverbe Media',
                    url: 'https://adverbemedia.com',
                    logo: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp',
                    sameAs: [
                        'https://x.com/theadverbe',
                        'https://www.instagram.com/theadverbe/',
                    ],
                },
                {
                    '@type': 'WebPage',
                    name: 'Careers at Adverbe Media',
                    url: 'https://adverbemedia.com/careers',
                    description: "Join the team building Ghana's most original podcast network, and leave your mark on the stories worth telling.",
                },
            ],
        }),
    },
};

export default async function CareersPage() {
    const supabase = await createClient();

    // Fetch active jobs from Supabase
    const { data: jobsRaw, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching jobs:', error);
    }

    // Map DB result to Job interface
    const jobs: Job[] = (jobsRaw || []).map((j: any) => ({
        id: j.id,
        slug: j.slug,
        title: j.title,
        location: j.location,
        type: j.type,
        description: j.description,
        requirements: j.requirements,
        isActive: j.is_active
    }));

    return <CareersPageContent jobs={jobs} />;
}
