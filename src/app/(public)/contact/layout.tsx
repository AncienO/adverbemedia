import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Adverbe Media',
    description: 'Get in touch with Adverbe Media. Partnerships, advertising, and general enquiries.',
    keywords: 'Contact Adverbe Media, Adverbe Media Ghana contact, Podcast network Ghana contact, Advertise with Adverbe Media, Ghana podcast advertising contact, Brand partnerships Ghana, Podcast collaboration Ghana, Media inquiries Ghana, Adverbe Media email, Accra media company contact',
    alternates: {
        canonical: 'https://adverbemedia.com/contact',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/Adverbe%20logo%202.webp',
    },
    appleWebApp: {
        title: 'Contact | Adverbe Media',
        capable: true,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://adverbemedia.com/contact',
        siteName: 'Adverbe Media',
        title: 'Contact | Adverbe Media',
        description: 'Get in touch with Adverbe Media. Partnerships, advertising, and general enquiries.',
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
        title: 'Contact | Adverbe Media',
        description: 'Get in touch with Adverbe Media. Partnerships, advertising, and general enquiries.',
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
                    contactPoint: {
                        '@type': 'ContactPoint',
                        contactType: 'customer support',
                        areaServed: 'GH',
                        availableLanguage: 'English',
                        email: 'info@adverbemedia.com',
                    },
                },
                {
                    '@type': 'ContactPage',
                    name: 'Contact Adverbe Media',
                    url: 'https://adverbemedia.com/contact',
                    description: 'Get in touch with Adverbe Media. Partnerships, advertising, and general enquiries.',
                },
            ],
        }),
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
