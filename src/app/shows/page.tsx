import React from 'react';
import { getShows, getCategories } from '@/lib/data';
import { ShowGrid } from '@/components/shows/show-grid';

export default async function ShowsPage() {
    const shows = await getShows();
    const categories = await getCategories();

    return (
        <div className="container px-4 md:px-6 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">Our Shows</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Explore our diverse collection of podcasts, from technology to storytelling.
                </p>
            </div>

            <ShowGrid shows={shows} categories={categories} />
        </div>
    );
}
