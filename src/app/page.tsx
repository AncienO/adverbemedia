import { Hero } from '@/components/home/hero';
import { FeaturedShows } from '@/components/home/featured-shows';
import { LatestEpisodes } from '@/components/home/latest-episodes';
import { Newsletter } from '@/components/home/newsletter';
import { getShows, getLatestEpisodes } from '@/lib/data';

export default async function Home() {
  const shows = await getShows();
  const latestEpisodes = await getLatestEpisodes();
  const featuredShow = shows.find(s => s.status === 'active') || shows[0];

  // Filter out the featured show from the grid if desired, or keep it. 
  // For now, we'll just pass all shows to the grid.

  return (
    <div className="flex flex-col min-h-screen">
      <Hero featuredShow={featuredShow} />
      <FeaturedShows shows={shows} />
      <LatestEpisodes episodes={latestEpisodes} />
      <Newsletter />
    </div>
  );
}
