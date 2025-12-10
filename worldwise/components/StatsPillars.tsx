import { Globe, Bus, ShieldCheck } from 'lucide-react';

export default function StatsPillars() {
  const stats = [
    { number: '3,000+', label: 'Students Served', icon: Globe },
    { number: '5+', label: 'Tour Types', icon: Bus },
    { number: '100%', label: 'Safe & Curriculum-Aligned', icon: ShieldCheck },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-neutralGray/20">
      <div className="max-w-7xl mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center group">
                <div className="inline-flex p-6 rounded-full bg-teal/10 group-hover:bg-teal transition-all duration-300 mb-6">
                  <Icon className="w-12 h-12 text-teal" />
                </div>
                <h3 className="text-5xl font-montserrat font-bold text-navy dark:text-white mb-2">
                  {stat.number}
                </h3>
                <p className="text-lg text-neutralGray dark:text-gray-300 font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: 'Real-World Learning',
              desc: 'Hands-on experiences that bring the curriculum to life beyond classroom walls',
              color: 'teal',
            },
            {
              title: 'Teacher Development',
              desc: 'Professional tours and training that empower educators with global best practices',
              color: 'greenYellow',
            },
            {
              title: 'Global Citizenship',
              desc: 'Fostering cultural appreciation, innovation, and regional cooperation',
              color: 'teal',
            },
          ].map((pillar, i) => (
            <div key={i} className="text-center">
              <div
                className={`inline-flex p-5 rounded-full bg-${pillar.color}/10 mb-6`}
              >
                <div className={`w-16 h-16 rounded-full bg-${pillar.color}`} />
              </div>
              <h3 className="text-3xl font-montserrat font-bold text-navy dark:text-white mb-4">
                {pillar.title}
              </h3>
              <p className="text-lg leading-relaxed text-neutralGray dark:text-gray-300">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
