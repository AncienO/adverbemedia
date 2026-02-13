import React from 'react';
import Link from 'next/link';
import { Show } from '@/types';
import { Button } from '@/components/ui/button';

interface FeaturedShowsProps {
    shows: Show[];
}

export function FeaturedShows({ shows }: FeaturedShowsProps) {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Shows</h2>
                        <p className="text-muted-foreground md:text-lg">Discover stories that matter.</p>
                    </div>
                    <Link href="/shows">
                        <Button variant="ghost" className="hidden sm:inline-flex">View All Shows &rarr;</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shows.map((show) => (
                        <Link key={show.id} href={`/shows/${show.slug}`} className="group block">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-3">
                                <img
                                    src={show.coverImage}
                                    alt={show.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-medium border border-white px-4 py-2 rounded-full backdrop-blur-sm">
                                        View Show
                                    </span>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{show.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{show.shortDescription}</p>
                        </Link>
                    ))}
                </div>
                <div className="mt-8 text-center sm:hidden">
                    <Link href="/shows">
                        <Button variant="outline" className="w-full">View All Shows</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
