'use client';

import { useState, useEffect } from 'react';
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from 'react-icons/fa';

import { motion, AnimatePresence } from 'framer-motion';

// Generate random particle positions outside of component
const generateParticlePositions = (count: number) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    positions.push({
      initialX: `${Math.random() * 100}vw`,
      initialY: `${Math.random() * 100}vh`,
      animateX: `${Math.random() * 100}vw`,
      animateY: `${Math.random() * 100}vh`,
      duration: 20 + Math.random() * 10,
    });
  }
  return positions;
};

const PARTICLE_POSITIONS = generateParticlePositions(20);

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const testimonials = [
    {
      name: 'Dr. Thandeka Mdluli',
      role: 'Principal, Mbabane High School',
      image: '/testimonials/principal.jpg',
      quote:
        "Our students' experience with WorldWise was transformative. The curriculum integration was seamless, and the safety measures gave us complete peace of mind.",
      rating: 5,
      tour: '7-Day Cultural Exchange Tour',
      date: 'March 2024',
      location: 'Eswatini & South Africa',
      highlight: 'Curriculum Integration',
    },
    {
      name: 'James Peterson',
      role: 'Geography Teacher, Waterford Kamhlaba',
      image: '/testimonials/teacher.jpg',
      quote:
        'The Mlilwane Wildlife Sanctuary tour brought our ecology unit to life. Students engaged with conservation in ways that textbooks could never achieve.',
      rating: 5,
      tour: '3-Day Ecology Program',
      date: 'February 2024',
      location: 'Mlilwane Wildlife Sanctuary',
      highlight: 'Hands-on Learning',
    },
    {
      name: 'Sarah Johnson',
      role: "Parent, St. Mark's College",
      image: '/testimonials/parent.jpg',
      quote:
        'My daughter returned more confident and culturally aware. The communication throughout the tour was exceptional - we felt included every step.',
      rating: 5,
      tour: '5-Day Leadership Retreat',
      date: 'January 2024',
      location: 'Royal National Park',
      highlight: 'Parental Confidence',
    },
    {
      name: 'Bongani Dlamini',
      role: 'University Coordinator, UNESWA',
      image: '/testimonials/coordinator.jpg',
      quote:
        'Professional, organized, and educationally sound. Our university students gained practical experience that complements their academic studies perfectly.',
      rating: 4,
      tour: '10-Day Research Expedition',
      date: 'December 2023',
      location: 'Multiple Research Sites',
      highlight: 'Academic Alignment',
    },
    {
      name: 'Lindiwe Nkosi',
      role: 'Student Participant, Grade 11',
      image: '/testimonials/student.jpg',
      quote:
        'The best learning experience of my life! I made friends, learned about different cultures, and discovered career paths I never knew existed.',
      rating: 5,
      tour: 'Cultural Immersion Program',
      date: 'November 2023',
      location: 'Cultural Heritage Sites',
      highlight: 'Life-changing Experience',
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="relative py-16 overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-linear-to-r from-teal/5 via-transparent to-emerald-500/5 animate-pulse"
          style={{ animationDuration: '15s' }}
        />
        <div
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-linear-to-r from-purple-500/5 via-transparent to-blue-500/5 animate-pulse"
          style={{ animationDuration: '20s' }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {PARTICLE_POSITIONS.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-teal/30 rounded-full"
              initial={{
                x: particle.initialX,
                y: particle.initialY,
              }}
              animate={{
                x: particle.animateX,
                y: particle.animateY,
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Elegant header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-teal/10 via-emerald-500/10 to-teal/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-teal to-emerald-500 blur-lg rounded-full" />
              <FaQuoteLeft className="relative w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-widest">
              VOICES OF EXPIRIENCE
            </span>
          </div>

          <h2 className="text-3xl lg:text-5xl  font-bold mb-2">
            Where{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-teal via-emerald-400 to-teal bg-clip-text text-transparent">
                Education
              </span>
              <span className="absolute inset-0 bg-linear-to-r from-teal/20 to-emerald-500/20 blur-2xl transform -skew-x-12" />
            </span>{' '}
            Meets{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-r from-yellow-400 via-blue-400 to-teal bg-clip-text text-transparent">
                Adventure
              </span>
              <span className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-blue-500/20 blur-2xl transform skew-x-12" />
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Join educators and students who have transformed learning through{' '}
            <span className="relative">
              <span className="text-white font-semibold">
                immersive experiences
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-teal to-emerald-500 rounded-full" />
            </span>
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="mx-auto">
          {/* Testimonial Carousel */}
          <div
            className="lg:col-span-2"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative">
              {/* Navigation arrows - Enhanced */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
                <motion.button
                  onClick={prevTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-5 rounded-2xl bg-linear-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-teal/50 transition-all duration-300 group"
                  aria-label="Previous testimonial"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-teal to-emerald-500 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <FaChevronLeft className="relative w-6 h-6 text-teal group-hover:text-white transition-colors" />
                  </div>
                </motion.button>
              </div>

              <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
                <motion.button
                  onClick={nextTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-5 rounded-2xl bg-linear-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-emerald-500/50 transition-all duration-300 group"
                  aria-label="Next testimonial"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <FaChevronRight className="relative w-6 h-6 text-emerald-400 group-hover:text-white transition-colors" />
                  </div>
                </motion.button>
              </div>

              {/* Testimonial Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, type: 'spring', damping: 20 }}
                  className="relative"
                >
                  {/* Card glow */}
                  <div className="absolute -inset-4 bg-linear-to-r from-teal/30 via-emerald-500/30 to-purple-500/30 blur-3xl rounded-3xl" />

                  <div className="relative bg-linear-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl overflow-hidden">
                    {/* Decorative corner accents */}
                    <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-teal/50 rounded-tl-3xl" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-emerald-500/50 rounded-br-3xl" />

                    <div className="relative">
                      {/* Quote with elegant typography */}
                      <div className="mb-5">
                        <div className="flex items-start gap-4">
                          <div className="relative mt-1">
                            <div className="absolute inset-0 bg-linear-to-r from-teal to-emerald-500 blur-lg rounded-full" />
                            <FaQuoteLeft className="relative w-6 h-6 text-white" />
                          </div>
                          <p className="text-lg lg:text-2xl font-light italic leading-relaxed text-gray-200">
                            &quot;{testimonials[currentIndex].quote}&quot;
                          </p>
                        </div>
                      </div>

                      {/* Highlight badge */}
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-teal/20 to-emerald-500/20 rounded-full border border-teal/30 mb-8">
                        <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                        <span className="text-sm font-semibold tracking-wider">
                          {testimonials[currentIndex].highlight}
                        </span>
                      </div>

                      {/* Author info with avatar placeholder */}
                      <div className="flex items-center gap-6 mb-8">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-teal to-emerald-500 p-0.5">
                            <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                              <span className="text-2xl font-bold text-teal">
                                {testimonials[currentIndex].name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-linear-to-r from-teal to-emerald-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                            <FaQuoteLeft className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-2xl font-bold mb-1">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-gray-300 mb-3">
                            {testimonials[currentIndex].role}
                          </p>
                        </div>
                      </div>

                      {/* Tour details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-linear-to-r from-white/5 to-white/10 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-linear-to-br from-teal/20 to-emerald-500/20 rounded-xl">
                            <FaMapMarkerAlt className="w-5 h-5 text-teal" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">
                              Location
                            </div>
                            <div className="font-medium">
                              {testimonials[currentIndex].location}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-linear-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
                            <FaCalendarAlt className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Date</div>
                            <div className="font-medium">
                              {testimonials[currentIndex].date}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-xl">
                            <span className="text-lg">🎯</span>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Program</div>
                            <div className="font-medium">
                              {testimonials[currentIndex].tour}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Indicators with preview */}
              <div className="flex justify-center items-center gap-4 mt-10">
                {testimonials.map((testimonial, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    className="relative group"
                    aria-label={`View testimonial from ${testimonial.name}`}
                  >
                    {/* Enhanced hover preview */}
                    <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
                      <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-r from-teal to-emerald-500 blur-lg rounded-lg" />
                        <div className="relative bg-slate-900 px-4 py-3 rounded-lg border border-white/10 backdrop-blur-sm">
                          <div className="font-semibold">
                            {testimonial.name.split(' ')[0]}
                          </div>
                          <div className="text-xs text-gray-300">
                            {testimonial.role.split(',')[0]}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-8 bg-linear-to-r from-teal to-emerald-500'
                          : 'bg-white/30 hover:bg-white/60'
                      }`}
                    >
                      {index === currentIndex && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-linear-to-r from-teal to-emerald-500"
                          layoutId="activeIndicator"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Institutions Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="text-center my-6">
            <h3 className="text-4xl font-bold mb-1">
              Trusted by{' '}
              <span className="relative">
                <span className="relative z-10 bg-linear-to-r from-teal via-emerald-400 to-teal bg-clip-text text-transparent">
                  Global Educators
                </span>
                <span className="absolute inset-0 bg-linear-to-r from-teal/20 to-emerald-500/20 blur-2xl" />
              </span>
            </h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Partnering with forward-thinking institutions committed to
              experiential education
            </p>
          </div>

          {/* Enhanced marquee */}
          <div className="relative overflow-hidden py-4 md:py-8">
            <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-linear-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-linear-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee">
              {[
                {
                  name: 'Mbabane High',
                  type: 'High School',
                  country: 'Eswatini',
                },
                {
                  name: 'Waterford',
                  type: 'International School',
                  country: 'Eswatini',
                },
                {
                  name: "St. Mark's",
                  type: 'Private School',
                  country: 'South Africa',
                },
                { name: 'UNESWA', type: 'University', country: 'Eswatini' },
                {
                  name: 'Sifundzani',
                  type: 'High School',
                  country: 'Eswatini',
                },
                {
                  name: 'Emmaus',
                  type: 'Boarding School',
                  country: 'Eswatini',
                },
                { name: 'Lobamba', type: 'Public School', country: 'Eswatini' },
                {
                  name: "St. Michael's",
                  type: 'Catholic School',
                  country: 'South Africa',
                },
                {
                  name: 'African Leadership',
                  type: 'Academy',
                  country: 'Rwanda',
                },
                { name: 'Crawford', type: 'College', country: 'South Africa' },
              ].map((school, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="shrink-0 w-72 mx-6 p-8 rounded-3xl bg-linear-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-teal/50 transition-all duration-500 group"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-3 group-hover:text-teal transition-colors duration-300">
                      {school.name}
                    </div>
                    <div className="text-gray-400 mb-4">{school.type}</div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
                      <div className="w-2 h-2 bg-teal rounded-full" />
                      <span className="text-sm text-gray-300">
                        {school.country}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
          display: flex;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
