import React from 'react';
import Link from 'next/link';
import { Play, Calendar, Clock } from 'lucide-react';
import { Episode, Show } from '@/types';
import { Button } from '@/components/ui/button';

interface EpisodeListProps {
    show: Show;
    episodes: Episode[];
}

export function EpisodeList({ show, episodes }: EpisodeListProps) {
    return (
        <div className="space-y-6">
            {episodes.map((episode) => (
                <div key={episode.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-bold">
                            <Link href={`/shows/${show.slug}/episodes/${episode.slug}`} className="hover:underline">
                                {episode.title}
                            </Link>
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{episode.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(episode.publishedAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {episode.duration}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center sm:self-center">
                        <Link href={`/shows/${show.slug}/episodes/${episode.slug}`}>
                            <Button size="sm" className="gap-2">
                                <Play className="h-4 w-4" />
                                Play Episode
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
