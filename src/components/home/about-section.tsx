'use client';

import React from 'react';

export function AboutSection() {
    return (
        <section className="w-full" style={{ backgroundColor: '#000000' }}>
            <div className="grid md:grid-cols-2">
                {/* Left Side - Title */}
                <div className="flex items-center justify-center py-20 md:py-32 px-6 md:px-12" style={{ backgroundColor: '#000000' }}>
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-center md:text-left"
                    >
                        <span className="block">One Home.</span>
                        <span className="block">Many Conversations</span>
                    </h2>
                </div>

                {/* Right Side - Text */}
                <div className="flex items-center py-20 md:py-32 px-6 md:px-12" style={{ backgroundColor: '#000000' }}>
                    <div className="space-y-6 text-lg md:text-xl leading-relaxed" style={{ color: '#CCCCCC' }}>
                        <p>
                            Adverbe is a portfolio of original podcast productions, each serving a distinct audience with content they can&apos;t find elsewhere. We develop shows, and build the editorial infrastructure that turns ideas into sustainable media properties.
                        </p>
                        <p>
                            Every production is video-first, editorially rigorous, and made to last. We&apos;re not chasing viral moments; we&apos;re building a permanent archive of the conversations that matter most across African life.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
