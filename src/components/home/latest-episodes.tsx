import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Show, Episode } from '@/types';
import { Button } from '@/components/ui/button';

interface LatestEpisodesProps {
    episodes: (Episode & { show: Show })[];
}

export function LatestEpisodes({ episodes }: LatestEpisodesProps) {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">Latest Episodes</h2>

                <div className="space-y-4">
                    {episodes.map((episode) => (
                        <div key={episode.id} className="group relative flex flex-col md:flex-row gap-4 p-4 rounded-xl hover:bg-background transition-colors border border-transparent hover:border-border">
                            <div className="flex-shrink-0 w-full md:w-32 aspect-square rounded-md overflow-hidden bg-muted">
                                <Image
                                    src={episode.show?.coverImage || episode.coverImage || 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/coming-soon.webp'}
                                    alt={episode.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 150px"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-center min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Link href={`/shows/${episode.show.slug}`} className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline">
                                        {episode.show.title}
                                    </Link>
                                    <span className="text-xs text-muted-foreground">• {new Date(episode.publishedAt).toLocaleDateString()}</span>
                                </div>

                                <h3 className="text-xl font-bold leading-tight mb-2 pr-8 group-hover:text-primary transition-colors">
                                    <Link href={`/shows/${episode.show.slug}/episodes/${episode.slug}`}>
                                        {episode.title}
                                    </Link>
                                </h3>
                                <p className="text-muted-foreground text-sm line-clamp-2 md:line-clamp-1 mb-3">
                                    {episode.description}
                                </p>

                                <div className="flex items-center gap-4">
                                    <Link href={`/shows/${episode.show.slug}/episodes/${episode.slug}`}>
                                        <Button size="sm" variant="secondary" className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <Play className="h-4 w-4 fill-current" />
                                            Play Episode
                                        </Button>
                                    </Link>
                                    <span className="text-xs font-mono text-muted-foreground">{episode.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
