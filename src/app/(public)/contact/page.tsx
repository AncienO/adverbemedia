'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { createContact } from '@/app/admin/_actions/contacts';

export default function ContactPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const subjects = [
        "General Inquiry",
        "Project Partnership",
        "Press & Media",
        "Careers"
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setIsSubmitting(true);
        setError('');

        const formData = new FormData(form);

        // Ensure subject is attached if selected
        if (selectedSubject) formData.set('subject', selectedSubject);

        const result = await createContact(formData);

        if (result.error) {
            setError('Something went wrong. Please try again.');
            setIsSubmitting(false);
        } else {
            setIsSubmitting(false);
            setIsSuccess(true);
            // Reset form
            form.reset();
            setSelectedSubject('');

            // Hide success notification after 4 seconds
            setTimeout(() => {
                setIsSuccess(false);
            }, 4000);
        }
    };

    return (
        <div className="w-full min-h-screen bg-white">

            <PageHeader
                title="Let's Connect"
                description="Have a project in mind or want to learn more about our work? We'd love to hear from you."
                centered
                className="contact-us-page-header"
            />

            <main className="pb-20 px-[5%] md:px-[10%] flex flex-col items-center">

                {/* Contact Grid */}
                <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-start relative">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gray-50 p-8 md:p-12 rounded-3xl space-y-10 h-full flex flex-col justify-center"
                    >
                        <div className="space-y-2">
                            <h3
                                className="text-2xl font-bold text-black mb-4 flex items-center gap-3"
                                style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                            >
                                <span className="w-10 h-10 rounded-full bg-[#E4192B]/10 flex items-center justify-center text-[#E4192B]">
                                    <Mail className="w-5 h-5" />
                                </span>
                                Email Us
                            </h3>
                            <a href="mailto:talktous@adverbemedia.com" className="block text-xl md:text-2xl font-medium text-gray-600 hover:text-[#E4192B] transition-colors">
                                talktous@adverbemedia.com
                            </a>
                        </div>

                        <div className="space-y-2">
                            <h3
                                className="text-2xl font-bold text-black mb-4 flex items-center gap-3"
                                style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                            >
                                <span className="w-10 h-10 rounded-full bg-[#E4192B]/10 flex items-center justify-center text-[#E4192B]">
                                    <MapPin className="w-5 h-5" />
                                </span>
                                Visit Us
                            </h3>
                            <address className="not-italic text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                                Adverbe Studios<br />
                                Oak Villa Estates, B5<br />
                                Abokobi<br />
                                Accra, Ghana
                            </address>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white p-2 relative"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="first-name" className="text-sm font-bold uppercase tracking-wider text-gray-500">First Name</label>
                                    <input
                                        className="w-full h-12 border-b-2 border-gray-200 focus:border-[#E4192B] outline-none text-lg transition-colors bg-transparent"
                                        id="first-name"
                                        name="firstName"
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last-name" className="text-sm font-bold uppercase tracking-wider text-gray-500">Last Name</label>
                                    <input
                                        className="w-full h-12 border-b-2 border-gray-200 focus:border-[#E4192B] outline-none text-lg transition-colors bg-transparent"
                                        id="last-name"
                                        name="lastName"
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                                <input
                                    className="w-full h-12 border-b-2 border-gray-200 focus:border-[#E4192B] outline-none text-lg transition-colors bg-transparent"
                                    id="email"
                                    name="email"
                                    type="email"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>

                            <div className="space-y-2 relative">
                                <label className="text-sm font-bold uppercase tracking-wider text-gray-500">I'm interested in...</label>

                                <div
                                    className="w-full h-12 border-b-2 border-gray-200 cursor-pointer flex items-center justify-between"
                                    onClick={() => !isSubmitting && setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span className={`text-lg transition-colors ${selectedSubject ? 'text-black' : 'text-gray-300'}`}>
                                        {selectedSubject || "Select an option"}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    </motion.div>
                                </div>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-xl border border-gray-100 z-50 overflow-hidden mt-2"
                                        >
                                            {subjects.map((subject) => (
                                                <div
                                                    key={subject}
                                                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer text-lg text-gray-700 hover:text-[#E4192B] transition-colors border-b border-gray-50 last:border-none"
                                                    onClick={() => {
                                                        setSelectedSubject(subject);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    {subject}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="space-y-2 pt-4">
                                <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-gray-500">Message</label>
                                <textarea
                                    className="w-full min-h-[120px] border-b-2 border-gray-200 focus:border-[#E4192B] outline-none text-lg transition-colors bg-transparent resize-y"
                                    id="message"
                                    name="message"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group mt-8 flex items-center text-xl font-bold text-black hover:text-[#E4192B] transition-colors disabled:opacity-50"
                                style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <span className="ml-3 w-10 h-10 rounded-full bg-black text-white group-hover:bg-[#E4192B] flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </span>
                            </button>
                        </form>

                        {/* Success Notification Overlay */}
                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute bottom-0 left-0 right-0 mx-2 mb-2 bg-[#E4192B] text-white p-4 rounded-xl shadow-lg flex items-center gap-3 z-50 pointer-events-none"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-white/90" />
                                    <p className="font-medium">Thank you! Your message has been received.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
