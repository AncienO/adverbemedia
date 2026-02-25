'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { subscribeToNewsletter } from '@/app/admin/_actions/subscribers';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setError('');

        const result = await subscribeToNewsletter(email);

        if (result.error) {
            setError('Something went wrong. Please try again.');
            setStatus('idle');
        } else {
            setStatus('success');
            setEmail('');

            setTimeout(() => {
                setStatus('idle');
            }, 4000);
        }
    };

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground relative flex flex-col items-center">
            <div className="container px-4 md:px-6 relative">
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Stay in the Loop</h2>
                        <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                            Get the latest episodes, behind-the-scenes content, and exclusive updates delivered to your inbox.
                        </p>
                    </div>
                    <div className="w-full max-w-sm space-y-2 relative">
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'submitting'}
                                required
                            />
                            <Button type="submit" variant="secondary" disabled={status === 'submitting'} className="shrink-0 bg-white text-black hover:bg-white/90 disabled:opacity-50">
                                {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                            </Button>
                        </form>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <p className="text-xs text-primary-foreground/60">
                            We respect your privacy. Unsubscribe at any time.
                        </p>

                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute -bottom-16 left-0 right-0 mx-auto w-fit bg-[#E4192B] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xl z-50 pointer-events-none"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-white/90" />
                                    <p className="text-sm font-medium">You're subscribed!</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
