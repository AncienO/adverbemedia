'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('error');
            setMessage('Please enter a valid email address.');
            return;
        }

        setStatus('submitting');

        // TODO: Integrate with actual newsletter service (Mailchimp, ConvertKit, etc.)
        // For now, simulate submission
        setTimeout(() => {
            setStatus('success');
            setMessage('Thank you for subscribing! We\'ll keep you updated.');
            setEmail('');
        }, 1000);
    };

    return (
        <section className="w-full py-16 md:py-24 bg-white border-t-2" style={{ borderColor: '#E4192B' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-4 md:px-6 max-w-2xl text-center"
            >
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: '#E4192B' }}>
                    Don't miss a launch.
                </h2>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-700 mb-8">
                    Subscribe to the Adverbe newsletter and be the first to know when new shows go live.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        disabled={status === 'submitting'}
                        className="flex-1 px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        required
                    />
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#E4192B' }}
                        onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#B8040E')}
                        onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#E4192B')}
                    >
                        {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                {/* Status Messages */}
                {status === 'success' && (
                    <p className="mt-4 text-sm text-green-700 font-medium">{message}</p>
                )}
                {status === 'error' && (
                    <p className="mt-4 text-sm text-red-700 font-medium">{message}</p>
                )}
            </motion.div>
        </section>
    );
}
