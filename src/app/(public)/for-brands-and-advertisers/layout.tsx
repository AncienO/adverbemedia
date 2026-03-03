import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'For Brands & Advertisers | Adverbe Media',
    description: 'Reach professionals, leaders, and engaged communities across Ghana through podcast sponsorship, advertising, and custom content.',
    keywords: 'Podcast advertising Ghana, Advertise on podcasts Ghana, Ghana podcast sponsorship, Ghana audio advertising, Podcast media buying Ghana, Brand partnerships Ghana, Sponsor a podcast Ghana, African podcast advertising, West Africa podcast network, Podcast marketing Ghana, Influencer marketing Ghana, Branded content Ghana, Ghana digital advertising, Accra advertising opportunities, Reach Ghanaian audiences, Podcast ad placements Ghana',
    alternates: {
        canonical: 'https://adverbemedia.com/for-brands-and-advertisers',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/Adverbe%20logo%202.webp',
    },
    appleWebApp: {
        title: 'For Brands & Advertisers | Adverbe Media',
        capable: true,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://adverbemedia.com/for-brands-and-advertisers',
        siteName: 'Adverbe Media',
        title: 'For Brands & Advertisers | Adverbe Media',
        description: 'Reach professionals, leaders, and engaged communities across Ghana through podcast sponsorship, advertising, and custom content.',
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
        title: 'For Brands & Advertisers | Adverbe Media',
        description: 'Reach professionals, leaders, and engaged communities across Ghana through podcast sponsorship, advertising, and custom content.',
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
                    '@type': 'Service',
                    name: 'Podcast Advertising & Brand Partnerships',
                    description: 'Reach professionals, leaders, and engaged communities across Ghana through podcast sponsorship, advertising, and custom content.',
                    provider: {
                        '@type': 'Organization',
                        name: 'Adverbe Media',
                        url: 'https://adverbemedia.com/for-brands-and-advertisers',
                    },
                    areaServed: {
                        '@type': 'Place',
                        name: 'Ghana',
                    },
                    serviceType: 'Podcast Advertising',
                    offers: {
                        '@type': 'OfferCatalog',
                        name: 'Advertising Services',
                        itemListElement: [
                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Podcast Sponsorships' } },
                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Host-Read Advertisements' } },
                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Branded Podcast Content' } },
                            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Integrated Brand Campaigns' } },
                        ],
                    },
                },
            ],
        }),
    },
};

export default function ForBrandsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
