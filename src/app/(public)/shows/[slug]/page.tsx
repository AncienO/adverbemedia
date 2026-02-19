import React from 'react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { EpisodeList } from '@/components/shows/episode-list';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Twitter, Instagram, Globe, Youtube, Linkedin } from 'lucide-react';
import { Show, Episode, Host } from '@/types';

interface ShowPageProps {
    params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function ShowPage({ params }: ShowPageProps) {
    const { slug } = await params;
    const supabase = await createClient();

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
        // console.error('Show not found:', slug, showError);
        notFound();
    }

    // Map Show Data
    const show: Show = {
        id: showRaw.id,
        slug: showRaw.slug,
        title: showRaw.title,
        description: showRaw.description,
        shortDescription: showRaw.short_description,
        coverImage: showRaw.cover_image_url,
        category: showRaw.categories?.name || 'General',
        status: showRaw.status as 'active' | 'coming-soon' | 'completed',
        socialLinks: showRaw.social_links,
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

    // Map Episodes Data
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
        showNotes: e.show_notes
    }));

    return (
        <div className="min-h-screen pb-12">
            {/* Show Header */}
            <div className="bg-secondary/30 pt-40 pb-12 md:pb-24 border-b border-border">
                <div className="w-full px-[5%] md:px-[10%]">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-full md:w-1/3 max-w-[300px] aspect-square rounded-xl overflow-hidden shadow-xl relative">
                            <Image
                                src={show.coverImage}
                                alt={show.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 300px"
                                priority
                            />
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
                                    {show.category}
                                </span>
                                {show.status === 'coming-soon' && (
                                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-secondary text-secondary-foreground border border-border rounded-full">
                                        Coming Soon
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter">{show.title}</h1>
                            <p className="text-lg text-muted-foreground md:text-xl line-clamp-4 max-w-2xl">
                                {show.description}
                            </p>

                            {/* Hosts */}
                            <div className="flex items-center gap-4 pt-4">
                                {show.hosts.map(host => (
                                    <div key={host.id} className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted relative">
                                            <Image
                                                src={host.avatar}
                                                alt={host.name}
                                                fill
                                                className="object-cover"
                                                sizes="40px"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{host.name}</p>
                                            <p className="text-xs text-muted-foreground">{host.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Social Links */}
                            {show.socialLinks && (
                                <div className="flex gap-4 pt-4">
                                    {show.socialLinks.twitter && (
                                        <a href={show.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                            <Button size="icon" variant="ghost" aria-label="X (Twitter)">
                                                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                </svg>
                                            </Button>
                                        </a>
                                    )}
                                    {show.socialLinks.instagram && (
                                        <a href={show.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                            <Button size="icon" variant="ghost" aria-label="Instagram">
                                                <Instagram className="w-5 h-5" />
                                            </Button>
                                        </a>
                                    )}
                                    {show.socialLinks.youtube && (
                                        <a href={show.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                                            <Button size="icon" variant="ghost" aria-label="YouTube">
                                                <Youtube className="w-5 h-5" />
                                            </Button>
                                        </a>
                                    )}
                                    {show.socialLinks.linkedin && (
                                        <a href={show.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                            <Button size="icon" variant="ghost" aria-label="LinkedIn">
                                                <Linkedin className="w-5 h-5" />
                                            </Button>
                                        </a>
                                    )}
                                    {show.socialLinks.website && (
                                        <a href={show.socialLinks.website} target="_blank" rel="noopener noreferrer">
                                            <Button size="icon" variant="ghost" aria-label="Website">
                                                <Globe className="w-5 h-5" />
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Episode List */}
            {episodes.length > 0 && (
                <div className="w-full px-[5%] md:px-[10%] py-12">
                    <h2 className="text-2xl font-bold mb-8">Episodes</h2>
                    <EpisodeList episodes={episodes} show={show} />
                </div>
            )}
        </div>
    );
}
