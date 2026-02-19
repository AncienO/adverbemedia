'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { CompanyDocument } from '@/types';
import { PageHeader } from '@/components/shared/page-header';

interface CompanySection {
    id: string;
    title: string;
    content: string;
    is_visible: boolean;
    sort_order: number;
}

interface CompanyPageContentProps {
    documents: CompanyDocument[];
    sections: CompanySection[];
}

export function CompanyPageContent({ documents, sections }: CompanyPageContentProps) {
    return (
        <div className="w-full min-h-screen bg-white">

            <PageHeader
                title="About Adverbe"
                description="Defining the sound of modern Africa through rigorous storytelling and immersive audio experiences."
            />

            <main className="pb-20 px-[5%] md:px-[10%]">

                {/* Dynamic Content */}
                <div className="flex flex-col gap-12 max-w-5xl">
                    {/* Text Sections from Database */}
                    {sections.map((section, index) => (
                        <React.Fragment key={section.id}>
                            {index > 0 && (
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="w-full h-px bg-[#E4192B] origin-left"
                                />
                            )}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
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
                                        {section.content.split('\n').map((para, i) => (
                                            para.trim() ? <p key={i}>{para}</p> : <br key={i} />
                                        ))}
                                    </div>
                                </div>
                            </motion.section>
                        </React.Fragment>
                    ))}

                    {/* Separator before Documents */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-px bg-[#E4192B] origin-left"
                    />

                    {/* Documents Section */}
                    <motion.section
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
                                Press &amp; Resources
                            </h2>
                            <p className="text-gray-500 text-lg">Download our official assets and reports.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {documents.map((doc, i) => (
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
                            {documents.length === 0 && (
                                <p className="text-gray-400 italic">No documents available.</p>
                            )}
                        </div>
                    </motion.section>
                </div>
            </main>
        </div>
    );
}
