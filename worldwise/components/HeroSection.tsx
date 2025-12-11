'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
  FaPlay,
  FaChevronDown,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaSchool,
  FaUniversity,
  FaUserGraduate,
  FaUsers as FaOrganization,
} from 'react-icons/fa';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const heroSlides = [
    {
      image: '/assets/tour3.jpg',
      title: 'Transform Classrooms',
      subtitle: 'into Global Adventures',
      description:
        'Eswatini Premier Educational Tours — Curriculum-aligned, safe, and unforgettable',
      ctaText: 'Explore Programs',
      ctaLink: '/programs',
    },
    {
      image: '/assets/tour1.jpg',
      title: 'Learning Beyond',
      subtitle: 'Four Walls',
      description: 'Hands-on experiences that bring textbooks to life',
      ctaText: 'View Destinations',
      ctaLink: '/destinations',
    },
    {
      image: '/assets/tour2.jpg',
      title: 'Cultural Exchange',
      subtitle: 'That Transforms',
      description: 'Building global citizens through immersive experiences',
      ctaText: 'Learn More',
      ctaLink: '/about',
    },
  ];

  const typingText =
    'Educational Tours | Cultural Exchange | Leadership Programs | Global Citizenship';

  const institutionOptions = [
    {
      value: 'school',
      label: 'Primary/High School',
      icon: <FaSchool className="w-4 h-4" />,
    },
    {
      value: 'university',
      label: 'University',
      icon: <FaUniversity className="w-4 h-4" />,
    },
    {
      value: 'college',
      label: 'College',
      icon: <FaUserGraduate className="w-4 h-4" />,
    },
    {
      value: 'organization',
      label: 'Organization/Group',
      icon: <FaOrganization className="w-4 h-4" />,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Slideshow auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Typing effect
  useEffect(() => {
    if (typingIndex < typingText.length) {
      const timeout = setTimeout(() => {
        setTypedText(typingText.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, typingText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              quality={100}
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/50 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-navy/60 to-transparent" />
          </div>
        ))}
      </div>

      {/* Animated Overlay Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#00e6d6_0%,transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,#00e6d6_0%,transparent_50%)] animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
              <span className="w-2 h-2 bg-teal rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold uppercase tracking-wider">
                Eswatini&apos;s #1 Educational Tours
              </span>
            </div>

            {/* Main Heading with Animation */}
            <h1 className="text-3xl  lg:text-4xl xl:text-5xl font-montserrat font-bold leading-tight mb-4">
              <span className="block">
                <span className="bg-linear-to-r from-teal via-greenYellow to-teal bg-clip-text text-transparent animate-gradient">
                  {heroSlides[currentSlide].title}
                </span>
              </span>
              <span className="block mt-2">
                {heroSlides[currentSlide].subtitle}
              </span>
            </h1>

            {/* Typing Text Effect */}
            <div className="mb-8 h-6">
              <p className="text-sm md:text-xl font-mono text-teal-300">
                {typedText}
                <span className="ml-1 w-2 h-5 bg-teal animate-pulse inline-block"></span>
              </p>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl font-inter pt-5 mb-8 max-w-2xl opacity-95 leading-relaxed">
              {heroSlides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8">
              <Link
                href={heroSlides[currentSlide].ctaLink}
                className="group relative overflow-hidden bg-linear-to-r from-teal to-emerald-500 text-navy font-bold px-6 py-5 rounded-full text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {heroSlides[currentSlide].ctaText}
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <button className="group flex items-center justify-center gap-3 text-white px-6 py-5 border-2 border-white/30 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                <FaPlay className="w-5 h-5" />
                <span className="font-bold text-lg">Watch Video</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <FaUsers />, value: '500+', label: 'Students Served' },
                {
                  icon: <FaMapMarkerAlt />,
                  value: '20+',
                  label: 'Destinations',
                },
                {
                  icon: <FaCalendarAlt />,
                  value: '5 Years',
                  label: 'Experience',
                },
                { value: '100%', label: 'Safety Record' },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl font-bold mb-2 group-hover:text-teal transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form/Booking Card */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl shadow-navy/30 hover:shadow-3xl transition-all duration-500 hover:border-teal/30">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Plan Your Educational Tour
                </h3>
                <p className="text-white/70 text-sm">
                  Get a custom quote tailored to your needs
                </p>
              </div>

              <div className="space-y-6">
                {/* Custom Dropdown */}
                <div ref={dropdownRef} className="relative">
                  <label className="block text-white/80 mb-2 text-sm font-semibold tracking-wide">
                    <span className="flex items-center gap-2">
                      <FaSchool className="w-3 h-3" />
                      Institution Type
                    </span>
                  </label>

                  {/* Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full bg-white/5 border ${
                      selectedInstitution ? 'border-teal/50' : 'border-white/20'
                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all duration-300 flex items-center justify-between group hover:bg-white/10`}
                  >
                    <div className="flex items-center gap-3">
                      {selectedInstitution ? (
                        <>
                          {
                            institutionOptions.find(
                              (opt) => opt.value === selectedInstitution
                            )?.icon
                          }
                          <span>
                            {
                              institutionOptions.find(
                                (opt) => opt.value === selectedInstitution
                              )?.label
                            }
                          </span>
                        </>
                      ) : (
                        <span className="text-white/60">
                          Select Institution
                        </span>
                      )}
                    </div>
                    <FaChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      } group-hover:text-teal`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 overflow-hidden animate-fadeIn">
                      <div className="py-2">
                        {institutionOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setSelectedInstitution(option.value);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-all duration-200 hover:bg-teal/10 hover:text-teal group ${
                              selectedInstitution === option.value
                                ? 'bg-teal/20 text-teal font-semibold'
                                : 'text-navy'
                            }`}
                          >
                            <span
                              className={`group-hover:scale-110 transition-transform ${
                                selectedInstitution === option.value
                                  ? 'text-teal'
                                  : 'text-navy/60'
                              }`}
                            >
                              {option.icon}
                            </span>
                            <span className="flex-1">{option.label}</span>
                            {selectedInstitution === option.value && (
                              <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Group Size Input */}
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-semibold tracking-wide">
                    <span className="flex items-center gap-2">
                      <FaUsers className="w-3 h-3" />
                      Group Size
                    </span>
                  </label>
                  <div className="relative">
                    <div className="flex items-center bg-white/5 border border-white/20 rounded-xl px-3 py-2.5 group hover:bg-white/10 hover:border-white/30 transition-all duration-300 focus-within:border-teal/50 focus-within:ring-2 focus-within:ring-teal/30">
                      <input
                        type="number"
                        min="10"
                        max="100"
                        defaultValue="25"
                        className="w-full bg-transparent text-white focus:outline-none text-lg font-medium placeholder:text-white/40"
                      />
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-teal hover:text-white transition-colors"
                          aria-label="Decrease group size"
                        >
                          −
                        </button>
                        <span className="text-white/60 text-sm min-w-[60px] text-center">
                          students
                        </span>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-teal hover:text-white transition-colors"
                          aria-label="Increase group size"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-semibold tracking-wide">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="w-3 h-3" />
                      Preferred Date
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal/50 transition-all duration-300 appearance-none hover:bg-white/10 [&::-webkit-calendar-picker-indicator]:opacity-0"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-6 h-6 bg-teal/20 rounded-lg flex items-center justify-center">
                        <FaCalendarAlt className="w-3 h-3 text-teal" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Link
                  href="/quote"
                  className="block w-full group relative overflow-hidden bg-linear-to-r from-greenYellow via-yellow-400 to-yellow-500 text-navy font-bold py-4 rounded-xl text-center hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] shadow-lg shadow-yellow-500/20"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                    Request Custom Quote
                    <svg
                      className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-yellow-500 to-greenYellow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>

                {/* Guarantee Badge */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-center gap-3 text-center">
                    <div className="w-8 h-8 bg-teal/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-teal"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-white/70">
                      <span className="text-teal font-semibold">
                        Guaranteed response
                      </span>{' '}
                      within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-teal'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <button
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }
          className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors group"
          aria-label="Scroll down"
        >
          <span className="text-sm font-medium tracking-wider">
            EXPLORE MORE
          </span>
          <FaChevronDown className="w-6 h-6 group-hover:translate-y-2 transition-transform" />
        </button>
      </div>
    </section>
  );
}
