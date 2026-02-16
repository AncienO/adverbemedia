import React from 'react';
import { notFound } from 'next/navigation';
import { getShowBySlug, getEpisodes } from '@/lib/data';
import { EpisodeList } from '@/components/shows/episode-list';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Twitter, Instagram, Globe } from 'lucide-react';

interface ShowPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ShowPage({ params }: ShowPageProps) {
    const { slug } = await params;
    const show = await getShowBySlug(slug);

    if (!show) {
        notFound();
    }

    const episodes = await getEpisodes(show.id);

    return (
        <div className="min-h-screen pb-12">
            {/* Show Header */}
            <div className="bg-secondary/30 py-12 md:py-24 border-b border-border">
                <div className="container px-4 md:px-6">
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

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">{show.title}</h1>
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
                            <div className="flex gap-4 pt-4">
                                <Button size="icon" variant="ghost">
                                    <Twitter className="w-5 h-5" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                    <Instagram className="w-5 h-5" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                    <Globe className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
