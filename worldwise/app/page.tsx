import HeroSection from '@/components/HeroSection';
import ProcessFlow from '@/components/ProcessFlow';
import TrustSection from '@/components/TrustSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import TourCalendar from '@/components/TourCalendar';
import CTASection from '@/components/CTASection';
import BlogPreview from '@/components/BlogPreview';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProcessFlow />
      <TrustSection />
      <TestimonialsSection />
      <WhyChooseUs />
      <TourCalendar />
      <CTASection />
      <BlogPreview />
    </>
  );
}
