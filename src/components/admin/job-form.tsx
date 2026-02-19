'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createJob, updateJob } from '@/app/admin/_actions/careers';
import { AdminSelect } from '@/components/admin/admin-select';

export function JobForm({ job }: { job?: any }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const formData = new FormData(e.currentTarget);
        const result = job ? await updateJob(job.id, formData) : await createJob(formData);
        if (result?.error) { setError(result.error); setLoading(false); }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin/careers">
                    <Button variant="ghost" size="sm" className="gap-2 text-gray-500 hover:text-gray-900">
                        <ArrowLeft className="w-4 h-4" /> Back to Careers
                    </Button>
                </Link>
            </div>

            <div>
                <h1 className="text-3xl font-bold font-serif text-gray-900">{job ? 'Edit Job Listing' : 'Create New Job'}</h1>
                <p className="text-gray-500 mt-1">{job ? 'Update job details below.' : 'Post a new job opportunity.'}</p>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-10">
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Job Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Title <span className="text-[#E4192B]">*</span></label>
                            <input name="title" defaultValue={job?.title} required placeholder="e.g. Audio Engineer"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Slug</label>
                            <input name="slug" defaultValue={job?.slug} placeholder="auto-generated"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                            <p className="text-xs text-gray-400">Leave blank to auto-generate</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Location</label>
                            <input name="location" defaultValue={job?.location} placeholder="e.g. Accra, Ghana"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors" />
                        </div>
                        <AdminSelect name="type" label="Type" defaultValue={job?.type || 'Full-time'}>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </AdminSelect>
                        <AdminSelect name="isActive" label="Status" defaultValue={job?.is_active !== false ? 'true' : 'false'}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </AdminSelect>
                    </div>
                </section>

                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-4">Description & Requirements</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Job Description</label>
                        <textarea name="description" defaultValue={job?.description} rows={6}
                            placeholder="Describe the role, responsibilities, and what the ideal candidate looks like..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Requirements</label>
                        <textarea name="requirements" defaultValue={job?.requirements} rows={5}
                            placeholder="List the qualifications, skills, and experience required..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E4192B]/20 focus:border-[#E4192B] text-sm transition-colors resize-y" />
                    </div>
                </section>

                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/careers"><Button type="button" variant="ghost" className="px-6">Cancel</Button></Link>
                    <Button type="submit" disabled={loading}
                        className="bg-[#E4192B] hover:bg-[#c41525] text-white gap-2 px-8 py-3 text-sm font-semibold rounded-lg shadow-sm">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {job ? 'Update Job' : 'Post Job'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
