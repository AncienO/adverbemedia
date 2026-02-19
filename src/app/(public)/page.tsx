import { createClient } from '@/lib/supabase/server';
import { Hero } from '@/components/home/hero';
import { AboutSection } from '@/components/home/about-section';
import { ShowsPreview } from '@/components/home/shows-preview';
import { PartnersSection } from '@/components/home/partners-section';
import { Show } from '@/types';

export default async function Home() {
  const supabase = await createClient();

  const { data: showsRaw } = await supabase
    .from('shows')
    .select(`
      *,
      categories (name)
    `)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  // Map to Show type
  const shows: Show[] = (showsRaw || []).map((s: any) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    description: s.description,
    shortDescription: s.short_description,
    coverImage: s.cover_image_url,
    category: s.categories?.name || 'General',
    status: s.status as 'active' | 'coming-soon' | 'completed',
    hosts: [],
    socialLinks: s.social_links
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <ShowsPreview shows={shows} />
      <PartnersSection />
    </div>
  );
}
