import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image – your Mlilwane giraffe flyer */}
        <Image
          src="/assets/tour3.jpg" // ← change to your exact giraffe flyer name if different
          alt="Students exploring Mlilwane Wildlife Sanctuary"
          fill
          priority
          className="object-cover brightness-75"
          sizes="100vw"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-navy/70 dark:bg-black/80" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-bold leading-tight mb-6">
            Transform Classrooms
            <br className="hidden sm:block" />
            into Global Adventures
          </h1>

          <p className="text-xl md:text-2xl font-inter mb-10 max-w-3xl mx-auto opacity-95">
            Eswatini’s Premier Educational Tours — Curriculum-aligned, safe, and
            unforgettable
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/ministry-partnership"
              className="px-10 py-5 bg-teal text-navy font-montserrat font-bold text-lg rounded-full hover:bg-greenYellow transition-all duration-300 shadow-xl"
            >
              Ministry Partnership
            </Link>
            <Link
              href="/quote"
              className="px-10 py-5 bg-transparent border-3 border-white text-white font-montserrat font-bold text-lg rounded-full hover:bg-white hover:text-navy transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
    </>
  );
}
