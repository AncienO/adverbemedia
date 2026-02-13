import React from 'react';
import { Button } from '@/components/ui/button';

export function Newsletter() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Stay in the Loop</h2>
                        <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                            Get the latest episodes, behind-the-scenes content, and exclusive updates delivered to your inbox.
                        </p>
                    </div>
                    <div className="w-full max-w-sm space-y-2">
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                placeholder="Enter your email"
                                type="email"
                                required
                            />
                            <Button type="submit" variant="secondary" className="shrink-0 bg-white text-black hover:bg-white/90">
                                Subscribe
                            </Button>
                        </form>
                        <p className="text-xs text-primary-foreground/60">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
