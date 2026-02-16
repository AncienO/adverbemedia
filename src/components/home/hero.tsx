'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {

    return (
        <section
            className="relative w-full h-[960px] flex items-center overflow-hidden"
            style={{
                background: 'linear-gradient(90deg, #000000 0%, #000000 20%, #E30512 80%, #E30512 100%)'
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

            {/* Container - shifted left by reducing right justification or adding margin margin-right */}
            <div className="container relative z-20 px-4 md:px-6 flex justify-start pl-[5%] md:pl-[10%]">
                <div className="w-full md:w-[90%] lg:w-[80%] xl:w-[70%] space-y-8">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-none text-white font-['Helvetica']">
                        <span className="block whitespace-nowrap text-[10vw] md:text-[8.5vw] lg:text-[9.5vw] xl:text-[10rem] leading-none mb-2">
                            Adverbe Media
                        </span>
                        <span className="block whitespace-nowrap">
                            is where conversation
                        </span>
                        <span className="block whitespace-nowrap">
                            becomes record
                        </span>
                    </h1>

                    <p className="max-w-[1200px] text-gray-100 text-base md:text-xl leading-normal">
                        Ghana&apos;s podcast network for ideas, industries, and communities that shape how we live. Produced with purpose. Archived with care. We create the conversations worth keeping.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <Link href="/shows">
                            <Button
                                size="lg"
                                className="font-[family-name:var(--font-inter)] rounded-none border-2 border-white bg-white text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-300 text-base px-6 h-11 min-w-[160px]"
                            >
                                Explore Shows
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="font-[family-name:var(--font-inter)] rounded-none border-2 border-white bg-white text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-300 text-base px-6 h-11 min-w-[160px]"
                            >
                                Partner with us
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
