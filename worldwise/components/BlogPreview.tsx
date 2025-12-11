'use client';

import {
  FaCalendar,
  FaUser,
  FaArrowRight,
  FaBookOpen,
  FaDownload,
} from 'react-icons/fa';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlogPreview() {
  const blogPosts = [
    {
      id: 1,
      title: 'Integrating Educational Tours into Your School Curriculum',
      excerpt:
        'Learn how to align tour experiences with learning objectives and assessment criteria.',
      author: 'Nelsiwe Ndwandwe',
      date: 'Mar 15, 2025',
      readTime: '5 min read',
      category: 'Curriculum',
      image: '/blog/curriculum.jpg',
      featured: true,
    },
    {
      id: 2,
      title: 'Safety Protocols for Student Travel in Eswatini',
      excerpt:
        'A comprehensive guide to our safety measures and emergency procedures.',
      author: 'Safety Team',
      date: 'Feb 28, 2025',
      readTime: '4 min read',
      category: 'Safety',
      image: '/blog/safety.jpg',
    },
    {
      id: 3,
      title: '5 Cultural Sensitivity Tips for Student Groups',
      excerpt:
        'Prepare your students for meaningful cultural exchanges and interactions.',
      author: 'Cultural Director',
      date: 'Feb 15, 2025',
      readTime: '3 min read',
      category: 'Culture',
      image: '/blog/culture.jpg',
    },
    {
      id: 4,
      title: 'Budgeting for Educational Tours: A Guide for Schools',
      excerpt:
        'Practical tips for planning and fundraising for student travel experiences.',
      author: 'Finance Team',
      date: 'Jan 30, 2025',
      readTime: '6 min read',
      category: 'Planning',
      image: '/blog/budget.jpg',
    },
  ];

  const resources = [
    {
      type: 'guide',
      title: "Educator's Planning Checklist",
      description: 'Step-by-step guide for teachers planning educational tours',
      icon: <FaBookOpen className="w-6 h-6" />,
      format: 'PDF Download',
    },

    {
      type: 'template',
      title: 'Parent Consent Forms',
      description: 'Ready-to-use templates and information packets',
      icon: <FaDownload className="w-6 h-6" />,
      format: 'Editable Templates',
    },
  ];

  return (
    <section className="py-24 bg-liner-to-b from-white to-gray-50 dark:from-navy-900 dark:to-navy">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-teal/10 text-teal rounded-full font-semibold mb-4">
            RESOURCES & INSIGHTS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Latest <span className="text-teal">Insights</span> & Resources
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Educational articles, planning guides, and resources to help you
            make the most of your students &apos; learning journey
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts
          .filter((post) => post.featured)
          .map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="bg-linear-to-r from-teal/10 to-emerald-500/10 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto">
                    <div className="absolute inset-0 bg-linear-to-r from-teal to-emerald-500 opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="inline-block px-4 py-2 bg-teal text-white rounded-full font-bold mb-4">
                          FEATURED ARTICLE
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 bg-teal text-white rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FaCalendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FaUser className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-gray-500 dark:text-gray-400">
                        {post.readTime}
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="group flex items-center gap-2 text-teal font-semibold hover:gap-4 transition-all"
                      >
                        Read Full Article
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts
            .filter((post) => !post.featured)
            .map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full">
                  {/* Image Placeholder */}
                  <div className="h-48 bg-linear-to-r from-teal to-emerald-500 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <div className="text-4xl font-bold opacity-20">WW</div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <FaUser className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span>{post.date}</span>
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-teal hover:text-teal-dark font-semibold"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
        </div>

        {/* Resources Section */}
        <div className="bg-linear-to-r from-teal/10 to-emerald-500/10 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Free Educator Resources
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Download our free resources to help plan and execute successful
              educational tours
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-teal to-emerald-500 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    {resource.icon}
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {resource.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-teal/10 text-teal rounded-full text-sm font-semibold">
                      {resource.format}
                    </span>
                    <button className="flex items-center gap-2 text-teal font-semibold group-hover:gap-4 transition-all">
                      Download
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Stay Updated
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Subscribe to our educator newsletter for the latest tour
                  opportunities, curriculum resources, and educational insights.
                </p>
              </div>

              <div>
                <form className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <button
                    type="submit"
                    className="bg-linear-to-r from-teal to-emerald-500 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  Monthly updates, no spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-teal text-teal rounded-full font-bold hover:bg-teal hover:text-white transition-all duration-300"
          >
            View All Articles & Resources
            <FaArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
