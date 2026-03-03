import { createClient } from '@/lib/supabase/server';
import { Hero } from '@/components/home/hero';
import { AboutSection } from '@/components/home/about-section';
import { ShowsPreview } from '@/components/home/shows-preview';
import { PartnersSection } from '@/components/home/partners-section';
import { Show } from '@/types';
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Adverbe Media',
  description: 'The Adverbe Media Podcast Network hosts original podcast shows for the ideas, industries, and communities shaping the African culture.',
  keywords: 'Ghana podcast network, Podcast network in Ghana, Ghanaian podcasts, Best podcasts in Ghana, Podcast studio Accra, Podcast advertising Ghana, Sponsor a podcast Ghana, African podcast network, West Africa podcast network, Podcast production Ghana, Audio advertising Ghana',
  alternates: {
    canonical: 'https://adverbemedia.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/Adverbe%20logo%202.webp',
  },
  appleWebApp: {
    title: 'Adverbe Media',
    capable: true,
  },
  other: {
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Adverbe Media',
      url: 'https://adverbemedia.com',
      logo: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp',
      sameAs: [
        'https://x.com/theadverbe',
        'https://www.instagram.com/theadverbe/',
      ],
    }),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://adverbemedia.com',
    siteName: 'Adverbe Media',
    title: 'Adverbe Media',
    description: 'The Adverbe Media Podcast Network hosts original podcast shows for the ideas, industries, and communities shaping the African culture.',
    images: [
      {
        url: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp',
        secureUrl: 'https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp',
        width: 2000,
        height: 2000,
        type: 'image/webp',
        alt: 'Adverbe Media',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@theadverbemedia',
    creator: '@adverbemedia',
    title: 'Adverbe Media',
    description: 'The Adverbe Media Podcast Network hosts original podcast shows for the ideas, industries, and communities shaping the African culture.',
    images: ['https://sdimiytucxidzdrlhwcz.supabase.co/storage/v1/object/public/uploads/images/adverbe-logo-white-bg.webp'],
  },
};



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
    <div className="home-page flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <ShowsPreview shows={shows} />
      <PartnersSection />
    </div>
  );
}
