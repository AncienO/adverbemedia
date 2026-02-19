import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';

export default async function NewsPage() {
    const supabase = await createClient();
    const { data: newsItems } = await supabase
        .from('news_articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

    return (
        <main className="w-full min-h-screen bg-white pt-24 pb-20 px-[5%] md:px-[10%]">
            {/* Page Header */}
            <div className="mb-16 md:mb-24">
                <h1
                    className="text-5xl md:text-7xl font-bold text-black tracking-tight mb-6"
                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    News &amp; Updates
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl font-light">
                    The latest stories, announcements, and behind-the-scenes updates from the Adverbe team.
                </p>
            </div>

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
                                    src={item.cover_image_url || '/coming-soon.png'}
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
    );
}
