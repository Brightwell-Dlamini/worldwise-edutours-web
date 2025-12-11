'use client';

import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaCalendarAlt,
  FaUserFriends,
} from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    message: '',
    tourInterest: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-24 bg-linear-to-br from-navy via-navy-900 to-navy text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-teal/20 text-teal rounded-full font-semibold mb-4">
            READY TO EXPLORE?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your{' '}
            <span className="text-greenYellow">Educational Journey</span> Today
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Contact us for a personalized consultation and let&apos;s create an
            unforgettable learning experience for your students
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-8">Get Your Custom Quote</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal"
                    placeholder="+268 76 123 456"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Institution *
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal"
                    placeholder="School/Organization name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Tour Interest
                </label>
                <select
                  name="tourInterest"
                  value={formData.tourInterest}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <option value="">Select a program</option>
                  <option value="ecology">Ecology & Conservation</option>
                  <option value="cultural">Cultural Heritage</option>
                  <option value="leadership">Leadership Summit</option>
                  <option value="science">Science Exploration</option>
                  <option value="custom">Custom Program</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Tell us about your group, dates, and educational goals..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-teal to-emerald-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                Request Free Consultation
              </button>

              <p className="text-center text-gray-400 text-sm">
                We&apos;ll respond within 24 hours with a customized proposal
              </p>
            </form>
          </motion.div>

          {/* Contact Info & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <div className="bg-linear-to-r from-teal/20 to-emerald-500/20 rounded-3xl p-8 border border-teal/30">
              <h3 className="text-2xl font-bold mb-6">Contact Us Directly</h3>

              <div className="space-y-6">
                <a
                  href="tel:+26876120713"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-teal flex items-center justify-center">
                    <FaPhone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Call us at</div>
                    <div className="text-xl font-bold group-hover:text-teal transition-colors">
                      +268 7612 0713
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/26876120713"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <FaWhatsapp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">WhatsApp</div>
                    <div className="text-xl font-bold group-hover:text-green-400 transition-colors">
                      Chat instantly
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:worldwisedutours@gmail.com"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <FaEnvelope className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Email us</div>
                    <div className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                      worldwisedutours@gmail.com
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-linear-to-r from-teal to-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <FaCalendarAlt className="w-8 h-8" />
                </div>
                <h4 className="font-bold mb-2">Schedule a Call</h4>
                <p className="text-sm text-gray-300">
                  Book a 30-minute consultation
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-linear-to-r from-greenYellow to-yellow-500 flex items-center justify-center mx-auto mb-4">
                  <FaUserFriends className="w-8 h-8" />
                </div>
                <h4 className="font-bold mb-2">Group Inquiry</h4>
                <p className="text-sm text-gray-300">
                  For groups of 10+ students
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
