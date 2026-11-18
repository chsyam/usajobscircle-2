import HeroSection from "@/components/home/HeroSection";
import StatisticsSection from "@/components/home/StatisticsSection";
import PopularCategories from "@/components/home/PopularCategories";
import PromoSection from "@/components/home/PromoSection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Testimonials from "@/components/home/Testimonials";
import RecentNews from "@/components/home/RecentNews";
import FeaturedEmployers from "@/components/home/FeaturedEmployers";
import CallToAction from "@/components/home/CallToAction";
import { getFeaturedJobs, getJobs } from "@/services/jobService";
import { getBlogPosts } from "@/services/blogService";
import { getTopEmployers } from "@/services/employerService";
import { popularCategories, testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";

export const metadata = {
  ...buildMetadata({ description: SITE.description, path: "/" }),
  title: { absolute: `${SITE.domain} – ${SITE.tagline}` },
};

export default async function HomePage() {
  const [featured, allJobs, posts, employers] = await Promise.all([
    getFeaturedJobs(5),
    getJobs(),
    getBlogPosts(),
    getTopEmployers(8),
  ]);

  const categories = popularCategories.map((c) => ({
    ...c,
    count: allJobs.filter((j) => j.sector === c.title).length,
  }));

  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <PopularCategories categories={categories} />
      <PromoSection />
      <FeaturedJobs jobs={featured} />
      <Testimonials items={testimonials} />
      <RecentNews posts={posts.slice(0, 3)} />
      <FeaturedEmployers employers={employers} />
      <CallToAction />
    </>
  );
}
