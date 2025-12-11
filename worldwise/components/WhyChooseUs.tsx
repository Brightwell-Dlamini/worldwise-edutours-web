'use client';

import {
  FaGraduationCap,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaUsers,
  FaClock,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState('safety');

  const features = {
    safety: {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Uncompromising Safety',
      description:
        "Your students' safety is our top priority. We implement comprehensive safety protocols including:",
      points: [
        '24/7 emergency support and monitoring',
        'All guides are certified first-aid responders',
        'Comprehensive travel insurance included',
        'Risk assessments for all activities and destinations',
        'Regular safety audits and protocol updates',
      ],
      stat: '100% Safety Record',
    },
    education: {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: 'Curriculum-Aligned Learning',
      description: 'Every tour is designed to enhance classroom learning with:',
      points: [
        'Custom learning objectives aligned with national curriculum',
        'Pre- and post-tour educational materials',
        'Hands-on activities that reinforce academic concepts',
        'Assessment tools to measure learning outcomes',
        'Certified educators as tour facilitators',
      ],
      stat: '500+ Learning Objectives',
    },
    experience: {
      icon: <FaMapMarkedAlt className="w-8 h-8" />,
      title: 'Authentic Experiences',
      description:
        'We go beyond tourist attractions to provide genuine cultural immersion:',
      points: [
        'Local community interactions and homestays',
        'Access to exclusive educational sites',
        'Cultural exchange programs with local schools',
        'Sustainability and conservation projects',
        'Traditional craft and cooking workshops',
      ],
      stat: '20+ Unique Destinations',
    },
    value: {
      icon: <FaMoneyBillWave className="w-8 h-8" />,
      title: 'Transparent Value',
      description:
        'No hidden costs - just comprehensive packages that include:',
      points: [
        'All-inclusive pricing with no surprise fees',
        'Flexible payment plans for schools',
        'Group discounts and early bird specials',
        'Scholarship opportunities available',
        'Detailed cost breakdowns provided upfront',
      ],
      stat: 'Best Value Guarantee',
    },
  };

  const tabs = [
    { id: 'safety', label: 'Safety & Security', icon: <FaShieldAlt /> },
    { id: 'education', label: 'Educational Value', icon: <FaGraduationCap /> },
    {
      id: 'experience',
      label: 'Authentic Experience',
      icon: <FaMapMarkedAlt />,
    },
    { id: 'value', label: 'Value & Support', icon: <FaMoneyBillWave /> },
  ];

  return (
    <section className="pt-20 bg-linear-to-b from-slate-800 to-gray-800 dark:from-slate-800 dark:to-navy">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-teal/10 text-teal rounded-full font-semibold mb-4">
            THE WORLDWISE DIFFERENCE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose <span className="text-teal">WorldWise</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We&apos;re not just another tour company. We&apos;re educators who
            understand how to create meaningful learning experiences beyond the
            classroom.
          </p>
        </div>

        <div className="grid mx-auto mb-10">
          {/* Tabs Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-linear-to-r from-teal to-emerald-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-teal to-emerald-500 flex items-center justify-center text-white shadow-lg">
                    {features[activeTab as keyof typeof features].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {features[activeTab as keyof typeof features].title}
                    </h3>
                    <div className="inline-block mt-2 px-4 py-1 bg-teal/10 text-teal rounded-full text-sm font-semibold">
                      {features[activeTab as keyof typeof features].stat}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {features[activeTab as keyof typeof features].description}
                </p>

                <ul className="space-y-3">
                  {features[activeTab as keyof typeof features].points.map(
                    (point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-teal rounded-full mt-2 shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {point}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Unique Selling Points */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaUsers className="w-8 h-8" />,
              title: 'Small Groups, Big Impact',
              description:
                'Optimal 1:10 guide-to-student ratio ensures personalized attention',
            },
            {
              icon: <FaClock className="w-8 h-8" />,
              title: 'Flexible Scheduling',
              description:
                'Tours available year-round to fit your academic calendar',
            },
            {
              icon: <FaMoneyBillWave className="w-8 h-8" />,
              title: 'No Hidden Costs',
              description:
                'All-inclusive pricing with flexible payment options',
            },
          ].map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-linear-to-r from-teal to-emerald-500 flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                {point.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {point.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
