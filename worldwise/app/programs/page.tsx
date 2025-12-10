import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'All Programs | WorldWise Educational Tours',
  description:
    'Local, Regional & International educational tours for Eswatini schools',
};

const programs = [
  {
    title: 'Local & Cross-Border Tours',
    desc: 'One-day & multi-day experiences within Eswatini and neighbouring regions',
    price: 'From SZL 320 per learner',
    image: '/assets/tour1.jpg', // City-to-City or Mantenga flyer
    href: '/programs/local-crossborder',
    badge: 'Most Popular',
  },
  {
    title: 'Regional Exchange Programs',
    desc: 'Southern Africa adventures – South Africa, Mozambique, Botswana',
    price: 'From ZAR 3,500 per learner',
    image: '/assets/tour3.jpg', // Mozambique bus flyer
    href: '/programs/regional',
  },
  {
    title: 'International Study Tours',
    desc: 'Global exposure to advanced education systems & world-class institutions',
    price: 'Coming 2026',
    image: '/assets/tour2.jpg', // Use any strong image
    href: '/programs/international',
    disabled: true,
  },
  {
    title: 'Teacher Development Tours',
    desc: 'Professional learning journeys for educators – local & international',
    price: 'Fully subsidised options available',
    image: '/assets/tour4.jpg', // Mlilwane or any teacher-focused shot
    href: '/programs/teacher-development',
    badge: 'Free for Teachers',
  },
  {
    title: 'Presidential/National School Programs',
    desc: 'Exclusive global insight tours for top-performing schools',
    price: 'By invitation only',
    image: '/assets/tour2.jpg',
    href: '/programs/presidential',
    badge: 'Elite',
  },
];

export default function Programs() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-32 bg-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-navy via-navy/90 to-navy" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6">
            Choose Your Adventure
          </h1>
          <p className="text-2xl font-inter opacity-90">
            Curriculum-aligned tours for every grade, budget, and ambition
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-neutralGray/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {programs.map((program, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 ${
                  program.disabled ? 'opacity-60' : ''
                }`}
              >
                {/* Badge */}
                {program.badge && (
                  <div
                    className={`absolute top-4 left-4 z-10 px-4 py-2 rounded-full text-sm font-bold text-navy ${
                      program.badge === 'Most Popular'
                        ? 'bg-greenYellow'
                        : program.badge === 'Free for Teachers'
                        ? 'bg-teal'
                        : 'bg-white'
                    }`}
                  >
                    {program.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-80">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-montserrat font-bold mb-3">
                    {program.title}
                  </h3>
                  <p className="text-lg mb-4 opacity-90">{program.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-greenYellow">
                      {program.price}
                    </span>
                    {/* Fixed button – no more runtime error */}
                    {program.disabled ? (
                      <span className="px-8 py-4 bg-gray-500 text-white rounded-full font-bold cursor-not-allowed opacity-70">
                        Coming Soon
                      </span>
                    ) : (
                      <Link
                        href={program.href}
                        className="px-8 py-4 bg-teal hover:bg-greenYellow text-navy rounded-full font-bold transition-all"
                      >
                        View Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-teal text-navy text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
            Can’t decide? Let us help.
          </h2>
          <p className="text-xl mb-10">
            Get a custom recommendation based on your grade, subject, and budget
          </p>
          <Link
            href="/quote"
            className="inline-block px-12 py-6 bg-navy text-white font-bold text-xl rounded-full hover:bg-greenYellow hover:text-navy transition-all"
          >
            Get Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
