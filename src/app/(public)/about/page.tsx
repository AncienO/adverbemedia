import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="container px-4 md:px-6 pt-40 pb-12 md:pb-24 max-w-4xl mx-auto">
            <div className="space-y-12">
                {/* Main Content */}
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Logo Section */}
                    <div className="flex justify-center mb-8">
                        <Image
                            src="https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp"
                            alt="Adverbe Media Logo"
                            width={300}
                            height={150}
                            className="w-auto h-24 md:h-32 object-contain"
                            priority
                        />
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center mb-8" style={{ color: '#E4192B' }}>
                        About Us
                    </h1>

                    <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed text-center font-medium">
                        <p>
                            Adverbe is a portfolio of original podcast productions, each serving a distinct audience with content they can&apos;t find elsewhere. We develop shows, and build the editorial infrastructure that turns ideas into sustainable media properties.
                        </p>
                        <p>
                            Every production is video-first, editorially rigorous, and made to last. We&apos;re not chasing viral moments; we&apos;re building a permanent archive of the conversations that matter most across African life.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-200">

                </div>
            </div>
        </div>
    );
}
