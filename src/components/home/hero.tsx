import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Show } from '@/types';

interface HeroProps {
    featuredShow: Show;
}

export function Hero({ featuredShow }: HeroProps) {
    return (
        <section className="relative w-full h-[600px] flex items-center bg-black text-white overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <img
                    src={featuredShow.coverImage}
                    alt={featuredShow.title}
                    className="w-full h-full object-cover opacity-70"
                />
            </div>

            <div className="container relative z-20 px-4 md:px-6">
                <div className="max-w-2xl space-y-6">
                    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        Featured Show
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none">
                        {featuredShow.title}
                    </h1>

                    <p className="max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        {featuredShow.description}
                    </p>

                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link href={`/shows/${featuredShow.slug}`}>
                            <Button size="lg" className="gap-2 bg-white text-black hover:bg-gray-200">
                                <Play className="h-5 w-5 fill-current" />
                                Start Listening
                            </Button>
                        </Link>
                        <Link href={`/shows/${featuredShow.slug}/about`}>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                                More Info
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
