'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Users, Globe, ArrowUpRight } from 'lucide-react';
import { CompanyDocument } from '@/types';

interface CompanyPageContentProps {
    documents: CompanyDocument[];
}

export function CompanyPageContent({ documents }: CompanyPageContentProps) {
    // Static content mixed with dynamic documents
    const pageContent = {
        header: {
            title: "About Adverbe",
            subtitle: "Defining the sound of modern Africa through rigorous storytelling and immersive audio experiences."
        },
        sections: [
            {
                id: 'mission',
                type: 'text-block',
                title: "Our Mission",
                content: "Adverbe is a digital media company built on the belief that audio is the most intimate and powerful medium for storytelling. We are dedicated to producing high-quality, narrative-driven content that resonates with audiences across the continent and the diaspora. Our work bridges the gap between traditional journalism and modern entertainment."
            },
            {
                id: 'stats',
                type: 'stats-grid',
                items: [
                    { label: "Original Shows", value: "12+" },
                    { label: "Monthly Downloads", value: "850k" },
                    { label: "Countries Reached", value: "24" },
                    { label: "Team Members", value: "18" }
                ]
            },
            {
                id: 'culture',
                type: 'text-block',
                title: "Culture & Values",
                content: "We operate with a 'Listener First' mentality. Every decision, from sound design to script editing, is made with the audience's experience in mind. We value curiosity, rigor, and the courage to tell complex stories. Our studio in Accra is a hub for creatives who want to push the boundaries of what African media can look and sound like."
            },
            {
                id: 'documents',
                type: 'documents-list',
                title: "Press & Resources",
                description: "Download our official assets and reports.",
                items: documents // Injected from props
            }
        ]
    };

    return (
        <main className="w-full min-h-screen bg-white pt-24 pb-20 px-[5%] md:px-[10%]">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-4xl mb-24"
            >
                <span className="block text-[#E4192B] font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
                    Company
                </span>
                <h1
                    className="text-5xl md:text-7xl font-bold text-black tracking-tight mb-8"
                    style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                >
                    {pageContent.header.title}
                </h1>
                <p className="text-xl md:text-3xl text-gray-600 font-light leading-relaxed max-w-3xl">
                    {pageContent.header.subtitle}
                </p>
            </motion.div>

            {/* Dynamic Content Renderer */}
            <div className="space-y-24 max-w-5xl">
                {pageContent.sections.map((section: any, index: number) => { // Type 'any' to handle mixed structure for now

                    // Render Text Blocks
                    if (section.type === 'text-block') {
                        return (
                            <motion.section
                                key={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="grid md:grid-cols-12 gap-8 md:gap-12"
                            >
                                <div className="md:col-span-4">
                                    <h2
                                        className="text-3xl font-bold text-black sticky top-32"
                                        style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                    >
                                        {section.title}
                                    </h2>
                                </div>
                                <div className="md:col-span-8">
                                    <div className="text-xl text-gray-700 leading-relaxed font-light prose prose-lg max-w-none">
                                        <p>{section.content}</p>
                                    </div>
                                </div>
                            </motion.section>
                        );
                    }

                    // Render Stats Grid
                    if (section.type === 'stats-grid') {
                        return (
                            <motion.section
                                key={section.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-gray-100"
                            >
                                {section.items.map((item: any, i: number) => (
                                    <div key={i} className="text-center md:text-left">
                                        <div className="text-4xl md:text-5xl font-bold text-[#E4192B] mb-2 font-serif">{item.value}</div>
                                        <div className="text-sm font-bold uppercase tracking-wider text-gray-400">{item.label}</div>
                                    </div>
                                ))}
                            </motion.section>
                        );
                    }

                    // Render Documents List
                    if (section.type === 'documents-list') {
                        return (
                            <motion.section
                                key={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-gray-50 rounded-3xl p-8 md:p-12"
                            >
                                <div className="mb-10">
                                    <h2
                                        className="text-3xl font-bold text-black mb-3"
                                        style={{ fontFamily: '"Adobe Garamond Pro", "EB Garamond", serif' }}
                                    >
                                        {section.title}
                                    </h2>
                                    <p className="text-gray-500 text-lg">{section.description}</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {(section.items || []).map((doc: CompanyDocument, i: number) => (
                                        <div
                                            key={doc.id || i}
                                            className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-[#E4192B]/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#E4192B]/10 group-hover:text-[#E4192B] transition-colors">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 group-hover:text-[#E4192B] transition-colors line-clamp-1">{doc.title}</h3>
                                                    <span className="text-sm text-gray-400 font-medium uppercase tracking-wider">{doc.fileFormat} • {doc.fileSize}</span>
                                                </div>
                                            </div>
                                            <Download className="w-5 h-5 text-gray-300 group-hover:text-[#E4192B] transition-colors" />
                                        </div>
                                    ))}
                                    {(!section.items || section.items.length === 0) && (
                                        <p className="text-gray-400 italic">No documents available.</p>
                                    )}
                                </div>
                            </motion.section>
                        );
                    }

                    return null;
                })}
            </div>
        </main>
    );
}
