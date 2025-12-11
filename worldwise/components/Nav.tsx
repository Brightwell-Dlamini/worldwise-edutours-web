'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaGlobe, FaChevronDown, FaUserGraduate } from 'react-icons/fa';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'sz'>('en');
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    {
      href: '/programs',
      label: 'Programs',
      dropdown: [
        { href: '/programs/school-tours', label: 'School Educational Tours' },
        { href: '/programs/university-visits', label: 'University Visits' },
        { href: '/programs/cultural-exchange', label: 'Cultural Exchange' },
        { href: '/programs/leadership-programs', label: 'Leadership Programs' },
      ],
    },
    { href: '/destinations', label: 'Destinations' },
    { href: '/ministry-partnership', label: 'Ministry Partnership' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
  ];

  const languageOptions = {
    en: { label: 'EN', full: 'English' },
    sz: { label: 'SZ', full: 'siSwati' },
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-linear-to-r from-teal to-emerald-600 text-white text-sm py-2 px-4 text-center">
        <p className="font-medium">
          ✨ Transformative Educational Journeys | Contact us at{' '}
          <a href="tel:+26876120713" className="font-bold underline">
            +268 7612 0713
          </a>
        </p>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-navy/95 backdrop-blur-xl shadow-lg border-b border-gray-200/20'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-teal to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <Image
                  src="/assets/logo.jpg"
                  alt="WorldWise Logo"
                  width={56}
                  height={56}
                  className="relative rounded-full ring-2 ring-white/20 object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-montserrat font-bold text-xl tracking-tight transition-colors ${
                    scrolled ? 'text-navy dark:text-white' : 'text-white'
                  }`}
                >
                  WorldWise
                </span>
                <span className="text-xs font-semibold text-teal tracking-wider uppercase">
                  Educational Tours
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group">
                  {link.dropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => setProgramsOpen(!programsOpen)}
                        className={`flex items-center gap-2 px-5 py-3 font-medium transition-colors rounded-lg ${
                          scrolled
                            ? 'text-gray-700 dark:text-gray-300 hover:text-teal'
                            : 'text-white/90 hover:text-white'
                        }`}
                      >
                        {link.label}
                        <FaChevronDown
                          className={`w-3 h-3 transition-transform ${
                            programsOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown */}
                      <div
                        className={`absolute top-full left-0 mt-2 w-64 bg-white dark:bg-navy rounded-xl shadow-2xl border border-gray-200/20 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0`}
                      >
                        <div className="py-2">
                          <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                              PROGRAMS
                            </p>
                          </div>
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-teal/5 hover:text-teal transition-colors group/item"
                            >
                              <div className="w-2 h-2 rounded-full bg-teal opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`px-5 py-3 font-medium transition-colors rounded-lg hover:bg-white/5 ${
                        scrolled
                          ? 'text-gray-700 dark:text-gray-300 hover:text-teal'
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Toggle */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                    scrolled
                      ? 'border-teal/30 bg-teal/5 text-navy dark:text-white hover:bg-teal/10'
                      : 'border-white/30 bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <FaGlobe className="w-4 h-4" />
                  <span className="font-medium">
                    {languageOptions[lang].label}
                  </span>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-navy rounded-xl shadow-xl border border-gray-200/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {Object.entries(languageOptions).map(([key, option]) => (
                    <button
                      key={key}
                      onClick={() => setLang(key as 'en' | 'sz')}
                      className={`w-full text-left px-4 py-3 transition-colors ${
                        lang === key
                          ? 'bg-teal/10 text-teal font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-teal/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.full}</span>
                        {lang === key && (
                          <div className="w-2 h-2 rounded-full bg-teal"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/quote"
                className="group relative overflow-hidden bg-linear-to-r from-teal to-emerald-500 text-white font-semibold px-6 py-3 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaUserGraduate className="w-4 h-4" />
                  Get Quote
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'text-navy dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    mobileOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                ></span>
                <span
                  className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    mobileOpen ? 'opacity-0' : ''
                  }`}
                ></span>
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                    mobileOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                ></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden fixed inset-x-0 top-0 h-screen bg-linear-to-b from-navy to-navy-900 pt-24 px-6 transition-transform duration-300 ease-out z-40 ${
              mobileOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.dropdown ? (
                    <div className="mb-2">
                      <button
                        onClick={() => setProgramsOpen(!programsOpen)}
                        className="flex items-center justify-between w-full text-white text-lg font-medium py-4 border-b border-white/10"
                      >
                        {link.label}
                        <FaChevronDown
                          className={`w-4 h-4 transition-transform ${
                            programsOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          programsOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <div className="py-3 pl-6 space-y-3">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block text-gray-300 hover:text-teal transition-colors py-2"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-white text-lg font-medium py-4 border-b border-white/10 hover:text-teal transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Actions */}
              <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                <div className="space-y-3">
                  <p className="text-gray-300 font-medium">Language</p>
                  <div className="flex gap-3">
                    {Object.entries(languageOptions).map(([key, option]) => (
                      <button
                        key={key}
                        onClick={() => setLang(key as 'en' | 'sz')}
                        className={`flex-1 py-3 rounded-lg border transition-colors ${
                          lang === key
                            ? 'border-teal bg-teal/20 text-white'
                            : 'border-white/20 text-gray-300 hover:border-teal/50'
                        }`}
                      >
                        {option.full}
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full bg-linear-to-r from-teal to-emerald-500 text-white font-semibold text-center py-4 rounded-xl hover:shadow-xl transition-all"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
