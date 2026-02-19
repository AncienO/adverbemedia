import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: article } = await supabase
        .from('news_articles')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

    if (!article) notFound();

    return (
        <main className="w-full min-h-screen bg-white pt-24 pb-20">
            {/* Back Link */}
            <div className="px-[5%] md:px-[10%] mb-8">
                <Link href="/news" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#E4192B] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to News
                </Link>
            </div>

            {/* Article Header */}
            <div className="px-[5%] md:px-[10%] mb-12">
                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4 block">
                    {article.published_at
                        ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                        : ''}
                </span>

                <h1
                    className="text-4xl md:text-6xl font-bold text-black tracking-tight mb-6 leading-tight"
                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    {article.title}
                </h1>

                {article.author_name && (
                    <p className="text-lg text-gray-500 font-light">
                        By <span className="text-gray-800 font-medium">{article.author_name}</span>
                    </p>
                )}
            </div>

            {/* Cover Image */}
            {article.cover_image_url && article.cover_image_url !== '/coming-soon.png' && (
                <div className="relative w-full aspect-[21/9] mb-16 bg-gray-100">
                    <Image
                        src={article.cover_image_url}
                        alt={article.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* Article Content */}
            <article className="w-[75%] mx-auto" style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", Georgia, serif' }}>
                {article.excerpt && (
                    <p className="text-2xl md:text-3xl text-gray-600 font-light leading-relaxed mb-12 border-l-4 border-[#E4192B] pl-6">
                        {article.excerpt}
                    </p>
                )}

                <div className="max-w-none
                    [&_p]:leading-[1.9] [&_p]:text-gray-700 [&_p]:text-[1.5rem] [&_p]:md:text-[1.75rem] [&_p]:mb-8
                    [&_a]:text-[#E4192B] [&_a]:no-underline hover:[&_a]:underline
                    [&_strong]:text-gray-900">
                    {article.content?.split('\n').map((paragraph: string, i: number) => (
                        paragraph.trim() ? <p key={i}>{paragraph}</p> : <br key={i} />
                    ))}
                </div>
            </article>

            {/* Footer */}
            <div className="px-[5%] md:px-[10%] max-w-3xl mt-16 pt-8 border-t border-gray-100">
                <Link href="/news" className="inline-flex items-center gap-2 text-sm font-medium text-[#E4192B] hover:underline">
                    <ArrowLeft className="w-4 h-4" />
                    Back to all articles
                </Link>
            </div>
        </main>
    );
}
