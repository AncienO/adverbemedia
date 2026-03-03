import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { PageHeader } from '@/components/shared/page-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'News | Adverbe Media',
    description: 'New shows. New voices. New moves. Everything at Adverbe, logged and worth reading.',
    keywords: 'Adverbe Media news, Ghana podcast news, Ghana media industry news, Ghana advertising news, Ghana creative industry updates, Podcast industry Ghana, Adverbe Media updates, Ghana marketing news, African podcast network news, Accra media news, Podcast press releases Ghana, Adverbe Media announcements',
    alternates: {
        canonical: 'https://adverbemedia.com/news',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/Adverbe%20logo%202.webp',
    },
    appleWebApp: {
        title: 'News | Adverbe Media',
        capable: true,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://adverbemedia.com/news',
        siteName: 'Adverbe Media',
        title: 'News | Adverbe Media',
        description: 'New shows. New voices. New moves. Everything at Adverbe, logged and worth reading.',
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
        title: 'News | Adverbe Media',
        description: 'New shows. New voices. New moves. Everything at Adverbe, logged and worth reading.',
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
                    '@type': 'CollectionPage',
                    name: 'Adverbe Media News',
                    url: 'https://adverbemedia.com/news',
                    description: 'New shows. New voices. New moves. Everything at Adverbe, logged and worth reading.',
                    mainEntity: {
                        '@type': 'Blog',
                        name: 'Adverbe Media News & Updates',
                        publisher: {
                            '@type': 'Organization',
                            name: 'Adverbe Media',
                        },
                    },
                },
            ],
        }),
    },
};


export default async function NewsPage() {
    const supabase = await createClient();
    const { data: newsItems } = await supabase
        .from('news_articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

    return (
        <div className="w-full min-h-screen bg-white">
            <PageHeader
                title="News & Updates"
                description="The latest stories, announcements, and behind-the-scenes updates from the Adverbe team."
                className="news-page-header"
            />

            <main className="pb-20 px-[5%] md:px-[10%]">

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {(newsItems || []).map((item) => (
                        <article
                            key={item.id}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <Link href={`/news/${item.slug}`} className="flex flex-col h-full">
                                {/* Image Container */}
                                <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden bg-gray-100 round-none">
                                    <Image
                                        src={item.cover_image_url || 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/coming-soon.webp'}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow">
                                    {/* Date */}
                                    <span className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
                                        {item.published_at
                                            ? new Date(item.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                                            : 'No date'}
                                    </span>

                                    {/* Title */}
                                    <h2
                                        className="text-3xl font-bold text-black mb-3 leading-tight group-hover:text-[#E4192B] transition-colors"
                                        style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                    >
                                        {item.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                                        {item.excerpt}
                                    </p>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {(!newsItems || newsItems.length === 0) && (
                    <div className="text-center py-24">
                        <p className="text-xl text-gray-400">No news articles published yet.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
