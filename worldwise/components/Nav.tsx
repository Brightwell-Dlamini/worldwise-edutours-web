'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'sz'>('en');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/programs', label: 'Programs' },
    { href: '/ministry-partnership', label: 'Ministry Partnership' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur-sm dark:bg-black/95 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo.png"
            alt="WorldWise Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <span className="hidden sm:block text-white font-montserrat font-bold text-xl">
            WorldWise
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/90 hover:text-teal font-medium transition"
            >
              {link.label}
            </Link>
          ))}

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'sz' : 'en')}
            className="px-4 py-2 bg-teal/20 hover:bg-teal/40 rounded-full text-white text-sm font-medium transition"
          >
            {lang === 'en' ? 'English' : 'siSwati'}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeWidth={2}
              d={
                mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy/98 border-t border-white/10">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white text-lg font-medium hover:text-teal transition"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setLang(lang === 'en' ? 'sz' : 'en')}
              className="self-start px-5 py-3 bg-teal text-navy font-bold rounded-full"
            >
              {lang === 'en' ? 'English' : 'siSwati'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
