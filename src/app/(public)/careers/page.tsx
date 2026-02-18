import React from 'react';
import { supabase } from '@/lib/supabase';
import { Job } from '@/types';
import { CareersPageContent } from '@/components/careers/careers-page-content';

export const revalidate = 0;

export default async function CareersPage() {
    // Fetch active jobs from Supabase
    const { data: jobsRaw, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching jobs:', error);
    }

    // Map DB result to Job interface
    const jobs: Job[] = (jobsRaw || []).map((j: any) => ({
        id: j.id,
        slug: j.slug,
        title: j.title,
        location: j.location,
        type: j.type,
        description: j.description,
        requirements: j.requirements,
        isActive: j.is_active
    }));

    return <CareersPageContent jobs={jobs} />;
}
