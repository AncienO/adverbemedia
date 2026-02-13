'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Show, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShowGridProps {
    shows: Show[];
    categories: Category[];
}

export function ShowGrid({ shows, categories }: ShowGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredShows = selectedCategory === 'all'
        ? shows
        : shows.filter(show => show.category.toLowerCase() === selectedCategory.toLowerCase());

    const activeShows = filteredShows.filter(show => show.status === 'active');
    const comingSoonShows = filteredShows.filter(show => show.status === 'coming-soon');

    return (
        <div className="space-y-12">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
                <Button
                    variant={selectedCategory === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('all')}
                    className="rounded-full"
                >
                    All
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={selectedCategory.toLowerCase() === category.name.toLowerCase() ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory(category.name.toLowerCase())}
                        className="rounded-full"
                    >
                        {category.name}
                    </Button>
                ))}
            </div>

            {/* Active Shows Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeShows.map((show) => (
                    <Link key={show.id} href={`/shows/${show.slug}`} className="group block space-y-3">
                        <div className="aspect-square overflow-hidden rounded-xl bg-muted relative">
                            <img
                                src={show.coverImage}
                                alt={show.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-medium border border-white px-4 py-2 rounded-full backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    Detail
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{show.category}</span>
                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{show.title}</h3>
                            <p className="text-muted-foreground line-clamp-2">{show.shortDescription}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Coming Soon Section */}
            {comingSoonShows.length > 0 && (
                <div className="pt-12 border-t border-border">
                    <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 opacity-75">
                        {comingSoonShows.map((show) => (
                            <div key={show.id} className="block space-y-3 pointer-events-none">
                                <div className="aspect-square overflow-hidden rounded-xl bg-muted relative grayscale">
                                    <img
                                        src={show.coverImage}
                                        alt={show.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-center text-white text-sm font-medium">
                                        Coming Soon
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{show.category}</span>
                                    <h3 className="font-bold text-xl text-muted-foreground">{show.title}</h3>
                                    <p className="text-muted-foreground line-clamp-2">{show.shortDescription}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeShows.length === 0 && comingSoonShows.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No shows found in this category.
                </div>
            )}
        </div>
    );
}
