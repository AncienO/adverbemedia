import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, Briefcase, Mail } from 'lucide-react';
import { parseJobSections } from '@/lib/job-sections';

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: job } = await supabase
        .from('jobs')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (!job) notFound();

    return (
        <main className="w-full min-h-screen bg-white pt-40 pb-20">
            {/* Back Link */}
            <div className="px-[5%] md:px-[10%] mb-8">
                <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#E4192B] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Careers
                </Link>
            </div>

            {/* Header */}
            <div className="px-[5%] md:px-[10%] mb-12">
                <span className="text-sm font-medium text-[#E4192B] uppercase tracking-widest mb-4 block">
                    Open Position
                </span>

                <h1
                    className="text-4xl md:text-6xl font-bold text-black tracking-tight mb-6 leading-tight"
                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    {job.title}
                </h1>

                <div className="flex flex-wrap gap-6 text-base text-gray-500">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        {job.type}
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-gray-400" />
                        {job.department || 'General'}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-[75%] mx-auto" style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", Georgia, serif' }}>

                {/* Description sections */}
                {job.description && (() => {
                    const sections = parseJobSections(job.description);
                    return sections.map((section, i) => (
                        <section key={i} className="mb-16">
                            {(section.title || i === 0) && (
                                <h2
                                    className="text-2xl md:text-3xl font-bold text-black mb-8 pb-4 border-b border-gray-100"
                                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                >
                                    {section.title || 'About the Role'}
                                </h2>
                            )}
                            <div className="space-y-6">
                                {section.blocks.map((block, j) => {
                                    if (block.type === 'text') return (
                                        <div key={j} className="space-y-4">
                                            {block.content.split('\n').map((para, k) =>
                                                para.trim()
                                                    ? <p key={k} className="text-[1.5rem] md:text-[1.75rem] leading-[1.9] text-gray-700">{para}</p>
                                                    : <br key={k} />
                                            )}
                                        </div>
                                    );
                                    if (block.type === 'subsection') return (
                                        <div key={j} className="space-y-3">
                                            {block.title && (
                                                <h2
                                                    className="text-2xl md:text-3xl font-bold text-black pb-4 border-b border-gray-100"
                                                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                                >
                                                    {block.title}
                                                </h2>
                                            )}
                                            {block.content && block.content.split('\n').map((para, k) =>
                                                para.trim()
                                                    ? <p key={k} className="text-[1.5rem] md:text-[1.75rem] leading-[1.9] text-gray-700">{para}</p>
                                                    : <br key={k} />
                                            )}
                                            {Array.isArray(block.items) && block.items.filter(i => i.trim()).length > 0 && (
                                                <ul className="space-y-3">
                                                    {block.items.filter(i => i.trim()).map((item, k) => (
                                                        <li key={k} className="flex gap-3 text-[1.5rem] md:text-[1.75rem] leading-[1.9] text-gray-700">
                                                            <span className="text-[#E4192B] font-bold flex-shrink-0 mt-0.5">•</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                    if (block.type === 'title') return (
                                        <div key={j} className="space-y-3">
                                            <h2
                                                className="text-2xl md:text-3xl font-bold text-black pb-4 border-b border-gray-100"
                                                style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                            >
                                                {block.text}
                                            </h2>
                                        </div>
                                    );
                                    if (block.type === 'bullets') return (
                                        <div key={j} className="space-y-3">
                                            {block.title && (
                                                <h4
                                                    className="text-lg md:text-xl font-semibold text-black"
                                                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                                >
                                                    {block.title}
                                                </h4>
                                            )}
                                            <ul className="space-y-3">
                                                {block.items.filter(item => item.trim()).map((item, k) => (
                                                    <li key={k} className="flex gap-3 text-[1.5rem] md:text-[1.75rem] leading-[1.9] text-gray-700">
                                                        <span className="text-[#E4192B] font-bold flex-shrink-0 mt-0.5">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                    return null;
                                })}
                            </div>
                        </section>
                    ));
                })()}

                {/* Requirements sections */}
                {job.requirements && (() => {
                    const sections = parseJobSections(job.requirements);
                    return sections.map((section, i) => (
                        <section key={i} className="mb-16">
                            {(section.title || i === 0) && (
                                <h2
                                    className="text-2xl md:text-3xl font-bold text-black mb-8 pb-4 border-b border-gray-100"
                                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                >
                                    {section.title || 'Requirements'}
                                </h2>
                            )}
                            <div className="space-y-6">
                                {section.blocks.map((block, j) => {
                                    if (block.type === 'text') return (
                                        <div key={j} className="space-y-4">
                                            {block.content.split('\n').map((para, k) =>
                                                para.trim()
                                                    ? <p key={k} className="text-[1.5rem] md:text-[1.75rem] leading-[1.9] text-gray-700">{para}</p>
                                                    : <br key={k} />
                                            )}
                                        </div>
                                    );
                                    if (block.type === 'subsection') return (
                                        <div key={j} className="space-y-3">
                                            {block.title && (
                                                <h2
                                                    className="text-2xl md:text-3xl font-bold text-black pb-4 border-b border-gray-100"
                                                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                                >
                                                    {block.title}
                                                </h2>
                                            )}
                                            {block.content && block.content.split('\n').map((para, k) =>
                                                para.trim()
                                                    ? <p key={k} className="text-[1.5rem] md:text-[1.75rem] leading-[1.9] text-gray-700">{para}</p>
                                                    : <br key={k} />
                                            )}
                                            {Array.isArray(block.items) && block.items.filter(i => i.trim()).length > 0 && (
                                                <ul className="space-y-3">
                                                    {block.items.filter(i => i.trim()).map((item, k) => (
                                                        <li key={k} className="flex gap-3 text-[1.5rem] md:text-[1.75rem] leading-[1.9] text-gray-700">
                                                            <span className="text-[#E4192B] font-bold flex-shrink-0 mt-0.5">•</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                    if (block.type === 'title') return (
                                        <div key={j} className="space-y-3">
                                            <h2
                                                className="text-2xl md:text-3xl font-bold text-black pb-4 border-b border-gray-100"
                                                style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                            >
                                                {block.text}
                                            </h2>
                                        </div>
                                    );
                                    if (block.type === 'bullets') return (
                                        <div key={j} className="space-y-3">
                                            {block.title && (
                                                <h4
                                                    className="text-lg md:text-xl font-semibold text-black"
                                                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                                >
                                                    {block.title}
                                                </h4>
                                            )}
                                            <ul className="space-y-3">
                                                {block.items.filter(item => item.trim()).map((item, k) => (
                                                    <li key={k} className="flex gap-3 text-[1.5rem] md:text-[1.75rem] leading-[1.9] text-gray-700">
                                                        <span className="text-[#E4192B] font-bold flex-shrink-0 mt-0.5">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                    return null;
                                })}
                            </div>
                        </section>
                    ));
                })()}


                {/* Apply CTA */}
                <section className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-black mb-4"
                        style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                    >
                        Interested?
                    </h2>
                    <p className="text-xl text-gray-500 mb-8 font-light">
                        Send us your CV and a short note about why you&apos;d be a great fit.
                    </p>
                    <a
                        href="mailto:theadverbe@gmail.com"
                        className="inline-flex items-center gap-2 bg-[#E4192B] hover:bg-[#c41525] text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                        Apply Now
                    </a>
                </section>

                {/* Back Link */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-medium text-[#E4192B] hover:underline">
                        <ArrowLeft className="w-4 h-4" />
                        Back to all openings
                    </Link>
                </div>
            </div>
        </main>
    );
}
