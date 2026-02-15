import React from 'react';

export default function AboutPage() {
    return (
        <div className="container px-4 md:px-6 py-12 md:py-24 max-w-4xl mx-auto">
            <div className="space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">About Us</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We are a network of storytellers, journalists, and creators dedicated to high-quality audio experiences.
                    </p>
                </div>

                <div className="prose prose-lg dark:prose-invert mx-auto">
                    <h2>Our Mission</h2>
                    <p>
                        At Podcast Network, our mission is to amplify voices that matter. We believe in the power of audio to educate, entertain, and inspire. Through deep reporting, compelling narratives, and honest conversations, we aim to help our listeners understand the world better.
                    </p>

                    <h2>Our Vision</h2>
                    <p>
                        We envision a world where high-quality audio journalism is accessible to everyone. We strive to be the standard-bearer for production value, editorial integrity, and creative innovation in the podcasting industry.
                    </p>

                    <h2>Our Commitment</h2>
                    <p>
                        Every show in our network is crafted with obsessive attention to detail. From sound design to fact-checking, we don&apos;t cut corners. We are committed to fostering a diverse community of creators and listeners, ensuring that a wide range of perspectives are heard and respected.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border">
                    <div className="text-center p-6 bg-secondary/30 rounded-xl">
                        <h3 className="font-bold text-4xl mb-2 text-primary">5M+</h3>
                        <p className="text-muted-foreground">Monthly Downloads</p>
                    </div>
                    <div className="text-center p-6 bg-secondary/30 rounded-xl">
                        <h3 className="font-bold text-4xl mb-2 text-primary">12</h3>
                        <p className="text-muted-foreground">Original Shows</p>
                    </div>
                    <div className="text-center p-6 bg-secondary/30 rounded-xl">
                        <h3 className="font-bold text-4xl mb-2 text-primary">50+</h3>
                        <p className="text-muted-foreground">Awards Won</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
