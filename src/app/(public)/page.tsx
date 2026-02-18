import { Hero } from '@/components/home/hero';
import { AboutSection } from '@/components/home/about-section';
import { ShowsPreview } from '@/components/home/shows-preview';
import { PartnersSection } from '@/components/home/partners-section';

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <ShowsPreview />
      <PartnersSection />
    </div>
  );
}
