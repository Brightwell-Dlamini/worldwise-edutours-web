import Image from 'next/image';
import Link from 'next/link';
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-navy to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src="/assets/logo.jpg"
                    alt="WorldWise Logo"
                    fill
                    className="rounded-full object-cover ring-4 ring-teal/20"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-montserrat font-bold tracking-tight">
                    WorldWise
                  </h2>
                  <p className="text-teal-300 text-sm font-semibold tracking-wider uppercase mt-1">
                    Educational Tours
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed text-center lg:text-left max-w-md">
                Bridging the gap between classroom learning and real-world
                exploration through transformative educational journeys.
              </p>

              {/* Social Media */}
              <div className="mt-8 flex gap-4">
                {[
                  { icon: FaFacebookF, href: '#', label: 'Facebook' },
                  { icon: FaInstagram, href: '#', label: 'Instagram' },
                  { icon: FaTwitter, href: '#', label: 'Twitter' },
                  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-montserrat font-bold mb-8 pb-3 border-b border-teal/30">
              Explore
            </h3>
            <ul className="space-y-4">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/programs', label: 'Programs' },
                { href: '/destinations', label: 'Destinations' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/testimonials', label: 'Testimonials' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-teal transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-teal rounded-full opacity-0 group-hover:opacity-100 mr-3 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-montserrat font-bold mb-8 pb-3 border-b border-teal/30">
              Contact
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-300">Mbabane, Eswatini</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                  <FaEnvelope className="w-5 h-5 text-teal" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:worldwisedutours@gmail.com"
                    className="text-gray-300 hover:text-teal transition-colors"
                  >
                    worldwisedutours@gmail.com
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-medium">Managing Director</p>
                <p className="text-lg font-semibold text-greenYellow">
                  Nelsiwe Nicky Ndwandwe
                </p>
              </div>
            </div>
          </div>

          {/* Get in Touch & Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-montserrat font-bold mb-8 pb-3 border-b border-teal/30">
              Get a Quote
            </h3>
            <p className="text-gray-300 mb-6">
              Ready to plan your educational tour? Contact us for a customized
              quote.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaPhone className="w-5 h-5 text-teal" />
                <a
                  href="tel:+26876120713"
                  className="text-lg font-medium hover:text-teal transition-colors"
                >
                  +268 7612 0713
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="w-5 h-5 text-teal" />
                <a
                  href="https://wa.me/26876120713"
                  className="text-lg font-medium hover:text-teal transition-colors"
                >
                  WhatsApp: +268 7612 0713
                </a>
              </div>
            </div>

            <Link
              href="/quote"
              className="mt-8 inline-block bg-linear-to-r from-teal to-emerald-500 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 WorldWise Educational Tours. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link
                href="/privacy-policy"
                className="hover:text-teal transition-colors"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-teal transition-colors">
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="hover:text-teal transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
