'use client';

import React, { useState } from 'react';
import { Show, Episode } from '@/types';
import { useAudio } from '@/lib/audio-context';
import { Button } from '@/components/ui/button';
import { Play, Pause, Download, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface EpisodeDetailProps {
    show: Show;
    episode: Episode;
}

export function EpisodeDetail({ show, episode }: EpisodeDetailProps) {
    const { playEpisode, isPlaying, currentEpisode } = useAudio();
    const [activeTab, setActiveTab] = useState<'notes' | 'transcript'>('notes');

    const isCurrent = currentEpisode?.id === episode.id;

    return (
        <div className="container px-4 md:px-6 pt-40 pb-12">
            <Link href={`/shows/${show.slug}`} className="text-sm text-muted-foreground hover:text-primary mb-4 block">
                &larr; Back to {show.title}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{episode.title}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground text-sm">
                            <span>{new Date(episode.publishedAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{episode.duration}</span>
                        </div>
                    </div>

                    {/* Player Action */}
                    <div className="bg-secondary/30 p-8 rounded-xl border border-border flex flex-col sm:flex-row items-center gap-6">
                        <Button
                            size="lg"
                            className="h-16 w-16 rounded-full shrink-0"
                            onClick={() => playEpisode(episode)}
                        >
                            {isCurrent && isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                        </Button>
                        <div className="space-y-1 text-center sm:text-left">
                            <h3 className="font-semibold text-lg">Listen to Episode</h3>
                            <p className="text-muted-foreground text-sm">
                                {isCurrent && isPlaying ? "Playing now..." : "Start listening"}
                            </p>
                        </div>
                        <div className="sm:ml-auto flex gap-2">
                            <Button variant="outline" size="icon" title="Download">
                                <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" title="Share">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div>
                        <div className="flex border-b border-border mb-6">
                            <button
                                onClick={() => setActiveTab('notes')}
                                className={cn(
                                    "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                                    activeTab === 'notes' ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                Show Notes
                            </button>
                            <button
                                onClick={() => setActiveTab('transcript')}
                                className={cn(
                                    "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                                    activeTab === 'transcript' ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                Transcript
                            </button>
                        </div>

                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            {activeTab === 'notes' ? (
                                <div>
                                    <p className="lead">{episode.description}</p>
                                    <div dangerouslySetInnerHTML={{ __html: episode.showNotes || '' }} />
                                    {!episode.showNotes && <p>No specific notes for this episode.</p>}
                                </div>
                            ) : (
                                <div className="bg-muted/30 p-6 rounded-lg font-mono text-sm leading-relaxed">
                                    {episode.transcript || "Transcript not available."}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <div className="bg-muted/50 p-6 rounded-xl border border-border">
                        <h3 className="font-bold mb-4">Subscribe</h3>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Podcasts_%28iOS%29.svg" width={20} height={20} className="h-5 w-5" alt="Apple" />
                                Apple Podcasts
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" width={20} height={20} className="h-5 w-5" alt="Spotify" />
                                Spotify
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" width={20} height={20} className="h-5 w-5" alt="YouTube" />
                                YouTube
                            </Button>
                        </div>
                    </div>

                    <div className="bg-muted/50 p-6 rounded-xl border border-border">
                        <h3 className="font-bold mb-4">About the Show</h3>
                        <div className="flex items-center gap-3 mb-3">
                            <Image src={show.coverImage} width={48} height={48} className="w-12 h-12 rounded bg-black object-cover" alt={show.title} />
                            <div>
                                <p className="font-semibold text-sm line-clamp-1">{show.title}</p>
                                <Link href={`/shows/${show.slug}`} className="text-xs text-primary hover:underline">View Show Page</Link>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3">{show.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
