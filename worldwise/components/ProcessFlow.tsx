'use client';

import {
  FaClipboardList,
  FaRoute,
  FaUsers,
  FaShieldAlt,
  FaStar,
  FaChevronRight,
  FaRegCalendarAlt,
  FaGlobeAmericas,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProcessFlow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      icon: <FaClipboardList className="w-6 h-6" />,
      title: 'Consultation & Planning',
      description:
        'We discuss your educational goals, group size, budget, and timeline to create a customized proposal.',
      duration: '1-3 days',
      color: 'from-teal to-emerald-500',
      features: ['Goal Assessment', 'Budget Planning', 'Timeline Mapping'],
      gradient: 'bg-linear-to-br from-teal/20 to-emerald-500/20',
      accent: 'bg-linear-to-br from-teal to-emerald-500',
    },
    {
      number: '02',
      icon: <FaRoute className="w-6 h-6" />,
      title: 'Custom Itinerary Design',
      description:
        'Our experts craft a curriculum-aligned itinerary with learning objectives, activities, and accommodations.',
      duration: '3-5 days',
      color: 'from-greenYellow to-yellow-500',
      features: [
        'Curriculum Alignment',
        'Activity Planning',
        'Accommodation Selection',
      ],
      gradient: 'bg-linear-to-br from-greenYellow/20 to-yellow-500/20',
      accent: 'bg-linear-to-br from-greenYellow to-yellow-500',
    },
    {
      number: '03',
      icon: <FaUsers className="w-6 h-6" />,
      title: 'Pre-Trip Preparation',
      description:
        'Orientation sessions, safety briefings, visa assistance, and educational materials provided.',
      duration: '2-4 weeks',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Safety Briefings',
        'Visa Assistance',
        'Educational Materials',
      ],
      gradient: 'bg-linear-to-br from-blue-500/20 to-cyan-500/20',
      accent: 'bg-linear-to-br from-blue-500 to-cyan-500',
    },
    {
      number: '04',
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: 'The Educational Journey',
      description:
        'Fully guided experience with certified educators, 24/7 support, and immersive learning activities.',
      duration: 'Tour duration',
      features: ['Certified Educators', '24/7 Support', 'Immersive Activities'],
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-linear-to-br from-purple-500/20 to-pink-500/20',
      accent: 'bg-linear-to-br from-purple-500 to-pink-500',
    },
    {
      number: '05',
      icon: <FaStar className="w-6 h-6" />,
      title: 'Post-Tour Follow-up',
      description:
        'Certificates, learning assessments, photo gallery, and feedback session for continuous improvement.',
      duration: '1 week after',
      features: ['Learning Assessments', 'Photo Gallery', 'Feedback Sessions'],
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-linear-to-br from-orange-500/20 to-red-500/20',
      accent: 'bg-linear-to-br from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="relative  py-8 bg-navy-750 overflow-hidden">
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-teal/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* Header - Compact */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal/20 bg-teal/5 backdrop-blur-sm mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-teal text-sm font-semibold tracking-wider">
              SEAMLESS PROCESS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-4xl font-bold mb-4"
          >
            <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How It
            </span>
            <span className="relative">
              <span className="bg-linear-to-r from-teal to-emerald-500 bg-clip-text text-transparent ml-2">
                Works
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-2 left-0 w-full h-0.5 bg-linear-to-r from-teal to-emerald-500 rounded-full"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            A meticulously crafted process that transforms educational visions
            into life-changing experiences.
          </motion.p>
        </div>

        {/* Interactive Progress Bar - Compact */}
        <div className="relative mb-8">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-teal via-greenYellow to-purple-500"
              initial={{ width: '0%' }}
              animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`flex flex-col items-center transition-all duration-300 ${
                  index <= activeStep ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    index === activeStep
                      ? `${step.accent} text-white scale-110 shadow-lg`
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {index === activeStep ? step.icon : step.number}
                </div>
                <span
                  className={`text-xs font-medium ${
                    index === activeStep ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  Step {step.number}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid - Compact */}
        <div className="grid lg:grid-cols-2 gap-8 items-start flex-1">
          {/* Left Column - Active Step Details */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div
              className={`absolute inset-0 rounded-2xl ${steps[activeStep].gradient} blur-xl opacity-50`}
            />
            <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-800/50 shadow-xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-teal/10 to-emerald-500/10 border border-teal/20 mb-3">
                    <FaRegCalendarAlt className="w-3 h-3 text-teal" />
                    <span className="text-xs font-semibold text-teal">
                      {steps[activeStep].duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-sm text-gray-300  leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                </div>
                <div
                  className={`w-16 h-16 rounded-xl ${steps[activeStep].accent} flex items-center justify-center text-white shadow-xl`}
                >
                  {steps[activeStep].icon}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-semibold text-white">
                  Key Features:
                </h4>
                {steps[activeStep].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700/30"
                  >
                    <div
                      className={`w-6 h-6 rounded-full ${steps[activeStep].accent} flex items-center justify-center text-white`}
                    >
                      <FaChevronRight className="w-2 h-2" />
                    </div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Process Visualization */}
          <div className="relative h-full">
            <div className="absolute inset-0 bg-linear-to-br from-gray-900/20 to-navy-900/20 rounded-2xl backdrop-blur-sm" />
            <div className="relative p-2 h-full flex items-center justify-center">
              {/* Circular Timeline - Smaller */}
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative w-full aspect-square">
                  <div className="absolute inset-0">
                    {/* Progress Ring */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="42%"
                        fill="none"
                        stroke="url(#gradient-ring)"
                        strokeWidth="1.5"
                        strokeDasharray={`${(activeStep + 1) * 20} 100`}
                        className="transition-all duration-700"
                      />
                      <defs>
                        <linearGradient
                          id="gradient-ring"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#0d9488" />
                          <stop offset="25%" stopColor="#84cc16" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="75%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#f97316" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Step Nodes */}
                  {steps.map((step, index) => {
                    const rotation = index * 72;
                    return (
                      <motion.button
                        key={index}
                        onClick={() => setActiveStep(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`absolute top-1/2 left-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
                          index === activeStep
                            ? `${step.accent} text-white scale-105 ring-2 ring-white/30`
                            : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}
                        style={{
                          transform: `rotate(${rotation}deg) translate(10rem) rotate(-${rotation}deg)`,
                        }}
                      >
                        {index === activeStep ? step.icon : step.number}
                      </motion.button>
                    );
                  })}

                  {/* Center Hub - Smaller */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-linear-to-br from-gray-800 to-navy-950 flex items-center justify-center">
                        <FaGlobeAmericas className="w-8 h-8 text-teal" />
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="absolute inset-0 rounded-full border border-teal/30 border-dashed"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
