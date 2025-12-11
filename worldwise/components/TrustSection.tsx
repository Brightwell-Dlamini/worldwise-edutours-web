'use client';

import {
  FaShieldAlt,
  FaCertificate,
  FaAward,
  FaUserCheck,
  FaHandshake,
  FaRegStar,
} from 'react-icons/fa';

import { motion } from 'framer-motion';

export default function TrustSection() {
  const credentials = [
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: '100% Safety Record',
      description: 'Zero incidents across 500+ student tours',
      stat: '5 Years',
    },
    {
      icon: <FaCertificate className="w-8 h-8" />,
      title: 'Ministry Certified',
      description: 'Official partnership with Eswatini Ministry of Education',
      stat: 'Certified',
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: 'Award-Winning Service',
      description: 'Recognized for excellence in educational tourism',
      stat: '2024 Winner',
    },
    {
      icon: <FaUserCheck className="w-8 h-8" />,
      title: 'Certified Guides',
      description:
        'All guides are trained educators with first-aid certification',
      stat: '15+ Guides',
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: '50+ Partner Schools',
      description: 'Trusted by institutions across Eswatini',
      stat: '50+ Schools',
    },
    {
      icon: <FaRegStar className="w-8 h-8" />,
      title: '4.9/5 Rating',
      description: 'Based on feedback from teachers and students',
      stat: '4.9★',
    },
  ];

  return (
    <section className="pt-14 pb-6 bg-linear-to-b from-slate-900 to-slate-950 dark:from-slate-950 dark:to-navy">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 bg-teal/10 text-teal rounded-full font-semibold mb-4">
            TRUSTED BY EDUCATORS
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Why Institutions <span className="text-teal">Trust Us</span>
          </h2>
          <p className="text:lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our commitment to safety, quality, and educational excellence has
            made us the preferred partner for schools across Eswatini.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {credentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-teal to-emerald-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>

                {/* Stat */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-3xl font-bold text-teal">
                    {item.stat}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
