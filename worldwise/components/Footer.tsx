import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1 – Logo + Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/assets/logo.jpg"
            alt="WorldWise Logo"
            width={80}
            height={80}
            className="rounded-full mb-4"
          />
          <p className="text-2xl font-montserrat font-bold">WorldWise</p>
          <p className="text-teal text-lg mt-2">
            Connecting Learning with Exploration
          </p>
        </div>

        {/* Column 2 – Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-montserrat font-bold mb-6 text-greenYellow">
            Contact Us
          </h3>
          <div className="space-y-4 text-lg">
            <p className="flex items-center justify-center md:justify-start gap-3">
              <span>Managing Director:</span>
              <span className="font-medium">Nelsiwe Nicky Ndwandwe</span>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-3">
              <span>Phone:</span>
              <a href="tel:+26876120713" className="hover:text-teal">
                +268 7612 0713
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-3">
              <span>WhatsApp:</span>
              <a href="https://wa.me/26876120713" className="hover:text-teal">
                +268 7612 0713
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-3">
              <span>Email:</span>
              <a
                href="mailto:worldwisedutours@gmail.com"
                className="hover:text-teal"
              >
                worldwisedutours@gmail.com
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-3">
              <span>Location:</span>
              <span>Mbabane, Eswatini</span>
            </p>
          </div>
        </div>

        {/* Column 3 – Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-montserrat font-bold mb-6 text-greenYellow">
            Quick Links
          </h3>
          <ul className="space-y-3 text-lg">
            {[
              { href: '/ministry-partnership', label: 'Ministry Partnership' },
              { href: '/programs', label: 'All Programs' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/quote', label: 'Get a Quote' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-teal transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 pt-8 border-t border-white/20 text-center">
        <p>© 2025 WorldWise Educational Tours. All rights reserved.</p>
      </div>
    </footer>
  );
}
