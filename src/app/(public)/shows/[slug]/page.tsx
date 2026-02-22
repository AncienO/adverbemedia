import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { EpisodeList } from '@/components/shows/episode-list';
import { StreamingLinks } from '@/components/shows/streaming-links';
import { ComingSoonVisual } from '@/components/shared/coming-soon-visual';
import Image from 'next/image';
import { Show, Episode } from '@/types';

interface ShowPageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function ShowPage({ params }: ShowPageProps) {
    const { slug } = await params;
    const supabase = await createClient();

    // ... existing fetch logic ...
    // Fetch Show
    const { data: showRaw, error: showError } = await supabase
        .from('shows')
        .select(`
            *,
            categories (name),
            show_hosts (
                hosts (*)
            )
        `)
        .eq('slug', slug)
        .single();

    if (showError || !showRaw) {
        notFound();
    }

    // Map Show Data
    const show: Show = {
        id: showRaw.id,
        slug: showRaw.slug,
        title: showRaw.title,
        description: showRaw.description,
        shortDescription: showRaw.short_description,
        summary: showRaw.summary,
        coverImage: showRaw.cover_image_url,
        category: showRaw.categories?.name || 'General',
        status: showRaw.status as 'active' | 'coming-soon' | 'completed',
        socialLinks: showRaw.social_links,
        adContent: showRaw.ad_content,
        relatedShowIds: showRaw.related_show_ids || [],
        hosts: (showRaw.show_hosts || []).map((sh: any) => ({
            id: sh.hosts.id,
            name: sh.hosts.name,
            bio: sh.hosts.bio,
            avatar: sh.hosts.avatar_url,
            role: sh.hosts.role,
            twitter: sh.hosts.social_links?.twitter,
            linkedin: sh.hosts.social_links?.linkedin,
        })),
    };

    // Fetch Episodes
    const { data: episodesRaw } = await supabase
        .from('episodes')
        .select('*')
        .eq('show_id', show.id)
        .order('published_at', { ascending: false });

    // Fetch Related Shows
    let relatedShows: any[] = [];
    if (show.relatedShowIds && show.relatedShowIds.length > 0) {
        const { data: rs } = await supabase
            .from('shows')
            .select('id, title, slug, cover_image_url')
            .in('id', show.relatedShowIds);
        relatedShows = rs || [];
    }

    const episodes: Episode[] = (episodesRaw || []).map((e: any) => ({
        id: e.id,
        slug: e.slug,
        title: e.title,
        description: e.description,
        showId: e.show_id,
        duration: e.duration,
        publishedAt: e.published_at,
        audioUrl: e.audio_url,
        coverImage: e.cover_image_url,
        tags: e.tags || [],
        transcript: e.transcript,
        showNotes: e.show_notes,
    }));

    // Split description into paragraphs for display
    const descriptionParagraphs = (show.description || '')
        .split(/\n+/)
        .map(p => p.trim())
        .filter(Boolean);

    return (
        <div className="min-h-screen bg-white">

            {/* ─── Hero: Cover + Info ─── */}
            <div className="w-full pt-36 pb-16 px-[5%] md:px-[10%]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-14 items-center justify-center">

                    {/* Left: Cover Image */}
                    <div className="w-full md:w-[576px] flex-shrink-0">
                        <div className="relative w-full aspect-square overflow-hidden shadow-2xl">
                            {show.status === 'coming-soon' && (!show.coverImage || show.coverImage === '/coming-soon.png') ? (
                                <ComingSoonVisual textSize="xl" dotSize="lg" />
                            ) : (
                                <Image
                                    src={show.coverImage || '/coming-soon.png'}
                                    alt={`Hero cover for ${show.title}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 576px"
                                    priority
                                    loading="eager"
                                />
                            )}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="pt-0 md:pt-2 flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">

                        {/* Status badges */}
                        <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#E4192B]">
                                {show.category}
                            </span>
                            {show.status === 'active' && (
                                <span className="flex items-center gap-1 text-xs font-semibold text-[#E4192B]">
                                    <span className="w-2 h-2 rounded-full bg-[#E4192B] animate-pulse inline-block" />
                                    Now Streaming
                                </span>
                            )}
                            {show.status === 'coming-soon' && (
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Coming Soon
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
                            style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif', color: '#111' }}
                        >
                            {show.title}
                        </h1>

                        {/* Full Description — paragraph-per-line like Vox */}
                        <div className="space-y-4 text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-4xl">
                            {descriptionParagraphs.length > 0
                                ? descriptionParagraphs.map((p, i) => <p key={i}>{p}</p>)
                                : <p>{show.description}</p>
                            }
                        </div>

                    </div>
                </div>

                {/* Dynamic Sections: Link, Hosts, Ads, Related, Connect */}
                <div className="mt-16 w-full flex flex-col items-start gap-12 text-left">

                    {/* Link Section (YouTube Preview) */}
                    <div className="w-full max-w-4xl">
                        <StreamingLinks socialLinks={show.socialLinks} variant="video" />
                    </div>

                    {/* Listen Section (Audio/RSS) */}
                    <div className="w-full max-w-4xl">
                        <StreamingLinks socialLinks={show.socialLinks} variant="listen" />
                    </div>

                    {/* Team Sections Grouped by Role */}
                    {show.hosts.length > 0 && (
                        Object.entries(
                            show.hosts.reduce((acc, member) => {
                                const roleName = member.role && member.role.trim() !== '' ? member.role : 'Host';
                                const sectionTitle = roleName.toUpperCase() + (roleName.toLowerCase().endsWith('s') ? '' : 'S');
                                if (!acc[sectionTitle]) acc[sectionTitle] = [];
                                acc[sectionTitle].push(member);
                                return acc;
                            }, {} as Record<string, typeof show.hosts>)
                        )
                            .sort(([a], [b]) => {
                                if (a === 'HOSTS') return -1;
                                if (b === 'HOSTS') return 1;
                                return a.localeCompare(b);
                            })
                            .map(([roleTitle, members], index, array) => (
                                <div key={roleTitle} className={`w-full max-w-4xl ${index === array.length - 1 ? 'mb-24' : 'mb-12'}`}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-0.5 h-5 bg-[#E4192B]" />
                                        <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">{roleTitle}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-start">
                                        {members.map(member => (
                                            <div key={member.id} className="flex flex-col sm:flex-row items-start gap-6 h-full">
                                                {member.avatar ? (
                                                    <div className="relative w-[143px] h-[143px] flex-shrink-0 overflow-hidden shadow-sm border border-gray-100">
                                                        <Image src={member.avatar} alt={`Avatar of ${member.name}`} fill className="object-cover" style={{ objectPosition: 'top' }} sizes="143px" loading="lazy" />
                                                    </div>
                                                ) : (
                                                    <div className="w-[143px] h-[143px] flex-shrink-0 bg-gray-100 flex items-center justify-center border border-gray-100">
                                                        <span className="text-3xl text-gray-400 font-bold">{member.name.charAt(0)}</span>
                                                    </div>
                                                )}
                                                <div className="text-left flex-1 min-w-0">
                                                    <p className="font-bold text-xl text-gray-900 leading-tight truncate">{member.name}</p>
                                                    {member.bio && <p className="text-base text-gray-500 mt-2 leading-relaxed whitespace-pre-wrap line-clamp-4">{member.bio}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                    )}

                    {/* Related Shows Section */}
                    {relatedShows.length > 0 && (
                        <div className="w-full max-w-4xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-0.5 h-5 bg-[#E4192B]" />
                                <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">Related Shows</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {relatedShows.map(rs => (
                                    <Link key={rs.id} href={`/shows/${rs.slug}`} className="group block mb-3">
                                        <div className="relative aspect-square overflow-hidden rounded-lg shadow-md mb-3 transform transition-transform duration-300 group-hover:scale-105">
                                            {!rs.cover_image_url || rs.cover_image_url === '/coming-soon.png' ? (
                                                <ComingSoonVisual textSize="sm" dotSize="sm" />
                                            ) : (
                                                <Image
                                                    src={rs.cover_image_url}
                                                    alt={`Related show: ${rs.title}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 50vw, 200px"
                                                    loading="lazy"
                                                />
                                            )}
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 group-hover:text-[#E4192B] transition-colors line-clamp-2">{rs.title}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Advertising Section */}
                    {show.adContent && (
                        <div className="w-full max-w-4xl text-left">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-0.5 h-5 bg-[#E4192B]" />
                                <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900">Advertising</h3>
                            </div>
                            <div className="text-lg text-gray-600 leading-relaxed italic border-l-2 border-[#E4192B] pl-6 py-2 text-left bg-gray-50 rounded-r-lg">
                                {show.adContent}
                            </div>
                        </div>
                    )}

                    {/* Connect Section */}
                    <div className="w-full max-w-4xl">
                        <StreamingLinks socialLinks={show.socialLinks} variant="links" />
                    </div>

                </div>
            </div>

            {/* ─── Divider ─── */}
            <div className="w-full px-[5%] md:px-[10%] flex justify-center">
                <div className="border-t-2 border-[#E4192B] w-24 mb-12" />
            </div>

            {/* ─── Episodes ─── */}
            {episodes.length > 0 && (
                <div className="w-full px-[5%] md:px-[10%] pb-20">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-0.5 h-7 bg-[#E4192B]" />
                        <h2
                            className="text-3xl md:text-4xl font-bold text-left"
                            style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                        >
                            Episodes
                        </h2>
                    </div>
                    <EpisodeList episodes={episodes} show={show} />
                </div>
            )}

            {episodes.length === 0 && (
                <div className="w-full px-[5%] md:px-[10%] pb-20">
                    <div className="flex items-center gap-3">
                        <div className="w-0.5 h-5 bg-[#E4192B]" />
                        <p className="text-gray-400 italic text-lg">No episodes yet. Check back soon.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
