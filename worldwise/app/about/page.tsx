'use client';

import {
  FaGraduationCap,
  FaMapMarkedAlt,
  FaHandsHelping,
  FaHeart,
  FaAward,
  FaUsers,
  FaGlobeAfrica,
  FaLeaf,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
  FaPlayCircle,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AboutUs() {
  const stats = [
    { number: '15+', label: 'Years Experience', icon: <FaGraduationCap /> },
    { number: '2,500+', label: 'Students Impacted', icon: <FaUsers /> },
    { number: '12', label: 'Regions Covered', icon: <FaMapMarkedAlt /> },
    { number: '98%', label: 'Satisfaction Rate', icon: <FaHeart /> },
  ];

  const values = [
    {
      title: 'Educational Excellence',
      description:
        'Rigorous curriculum alignment with national education standards and hands-on learning methodologies.',
      icon: <FaGraduationCap className="w-8 h-8" />,
      color: 'from-teal to-emerald-500',
    },
    {
      title: 'Cultural Preservation',
      description:
        'Authentic cultural experiences that honor and preserve Swati heritage and traditions.',
      icon: <FaGlobeAfrica className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Sustainable Tourism',
      description:
        'Environmentally responsible tours that support conservation and local communities.',
      icon: <FaLeaf className="w-8 h-8" />,
      color: 'from-green-400 to-emerald-600',
    },
    {
      title: 'Safety First',
      description:
        'Comprehensive safety protocols and 24/7 support for all participants.',
      icon: <FaHandsHelping className="w-8 h-8" />,
      color: 'from-blue-500 to-indigo-500',
    },
  ];

  const team = [
    {
      name: 'Dr. Thandeka Nkosi',
      role: 'Founder & Educational Director',
      bio: 'PhD in Environmental Education with 20+ years experience in curriculum development.',
      imageColor: 'bg-linear-to-r from-teal to-emerald-500',
      expertise: ['Curriculum Design', 'Conservation', 'Teacher Training'],
    },
    {
      name: 'Mandla Dlamini',
      role: 'Operations Director',
      bio: 'Former National Parks ranger with extensive knowledge of Eswatini&apos;s ecosystems.',
      imageColor: 'bg-linear-to-r from-amber-500 to-orange-500',
      expertise: ['Logistics', 'Wildlife', 'Safety Management'],
    },
    {
      name: 'Nomsa Vilakazi',
      role: 'Cultural Programs Coordinator',
      bio: 'Cultural anthropologist specializing in Swati traditions and community engagement.',
      imageColor: 'bg-linear-to-r from-purple-500 to-pink-500',
      expertise: ['Cultural Studies', 'Community Relations', 'Language'],
    },
    {
      name: 'Sipho Mamba',
      role: 'Science & Exploration Lead',
      bio: 'Marine biologist and outdoor education specialist with 15 years field experience.',
      imageColor: 'bg-linear-to-r from-blue-500 to-indigo-500',
      expertise: ['Field Research', 'Science Education', 'Adventure Sports'],
    },
  ];

  const testimonials = [
    {
      quote:
        'The Ecology Tour transformed how my students engage with environmental science. The hands-on conservation work was unforgettable.',
      author: 'Sarah Johnson',
      role: 'Biology Teacher, Waterford Kamhlaba',
      rating: 5,
      tour: 'Ecology & Conservation Expedition',
    },
    {
      quote:
        'Our students returned from the Cultural Heritage Tour with a profound appreciation for Swati traditions. An educational experience like no other.',
      author: 'David Nxumalo',
      role: 'Head of Social Studies, St. Mark&apos;s High',
      rating: 5,
      tour: 'Cultural Heritage Discovery',
    },
    {
      quote:
        'The Leadership Summit developed our students&apos; confidence and teamwork skills beyond what any classroom could achieve.',
      author: 'Grace Bhembe',
      role: 'Principal, Mbabane International School',
      rating: 5,
      tour: 'Leadership Summit & Development',
    },
  ];

  const certifications = [
    { name: 'Eswatini Tourism Authority', year: 'Certified 2010' },
    { name: 'International Eco-Tourism Society', year: 'Member Since 2012' },
    { name: 'National Education Board', year: 'Accredited Provider' },
    { name: 'Wildlife Conservation Network', year: 'Partner Organization' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-navy-950 via-navy-900 to-navy-950 text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-teal/10 via-transparent to-emerald-500/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-teal/5 blur-3xl"></div>
        <div className="absolute bottom-40 -left-40 w-96 h-96 rounded-full bg-greenYellow/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full font-medium text-sm mb-6">
              <FaGraduationCap className="text-teal" />
              <span>ABOUT WORLDWISE EDUCATIONAL TOURS</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Shaping{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-greenYellow to-teal">
                Future Leaders
              </span>
              <br />
              Through{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-teal to-emerald-400">
                Experiential Learning
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              For over 15 years, we have been connecting students with
              transformative educational experiences across Eswatini, blending
              rigorous academics with cultural immersion and environmental
              stewardship.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-linear-to-r from-greenYellow to-yellow-500 text-navy font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2">
                Our Educational Philosophy
                <FaChevronRight />
              </button>
              <button className="px-8 py-4 border-2 border-white/20 backdrop-blur-sm rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                <FaPlayCircle />
                Watch Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <div className="text-3xl text-teal">{stat.icon}</div>
                </div>
                <div className="text-4xl font-bold bg-linear-to-r from-teal to-emerald-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-linear-to-r from-teal to-emerald-500 flex items-center justify-center">
                  <FaAward className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                To provide immersive, curriculum-aligned educational tours that
                foster academic excellence, cultural understanding, and
                environmental stewardship, empowering students to become
                informed, compassionate global citizens.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-teal"></div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Academic Rigor</h4>
                    <p className="text-gray-400">
                      All tours are developed in collaboration with education
                      experts to meet and exceed curriculum standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-teal"></div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Authentic Experiences</h4>
                    <p className="text-gray-400">
                      Genuine cultural exchanges and hands-on learning
                      opportunities that go beyond typical tourism.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Our Values */}
            <div>
              <h2 className="text-3xl font-bold mb-10">Our Core Values</h2>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-teal/30 transition-all group"
                  >
                    <div className="flex items-start gap-6">
                      <div
                        className={`w-16 h-16 rounded-xl bg-linear-to-r ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        {value.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-300">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From humble beginnings to becoming Eswatini&apos;s leading
              educational tour provider
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-teal to-emerald-500"></div>

            <div className="space-y-20">
              {[
                {
                  year: '2008',
                  title: 'Founding Vision',
                  description:
                    'WorldWise Educational Tours was founded by Dr. Thandeka Nkosi with a single ecology tour program.',
                  side: 'left',
                },
                {
                  year: '2012',
                  title: 'National Recognition',
                  description:
                    'Received accreditation from the National Education Board and expanded to 5 tour programs.',
                  side: 'right',
                },
                {
                  year: '2016',
                  title: 'Regional Expansion',
                  description:
                    'Launched partnerships with schools across Southern Africa and introduced cultural immersion tours.',
                  side: 'left',
                },
                {
                  year: '2020',
                  title: 'Digital Transformation',
                  description:
                    'Developed virtual tour options and interactive learning platforms during global challenges.',
                  side: 'right',
                },
                {
                  year: '2024',
                  title: 'Innovation Leader',
                  description:
                    'Introduced augmented reality learning tools and expanded to serve 2,500+ students annually.',
                  side: 'left',
                },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    milestone.side === 'left'
                      ? 'justify-start pr-12 md:pr-0 md:justify-end'
                      : 'justify-start pl-12 md:pl-0'
                  }`}
                >
                  <div
                    className={`w-full md:w-1/2 ${
                      milestone.side === 'left'
                        ? 'md:pr-16 text-right'
                        : 'md:pl-16'
                    }`}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-teal/30 transition-all">
                      <div className="inline-block px-4 py-2 bg-teal/20 text-teal rounded-full font-bold mb-4">
                        {milestone.year}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-teal border-4 border-navy-900 z-10"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate educators, guides, and specialists dedicated to
              creating unforgettable learning experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <div
                    className={`${member.imageColor} aspect-square rounded-2xl`}
                  ></div>
                  <div className="absolute inset-0 bg-linear-to-t from-navy-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="space-y-2">
                      {member.expertise.map((skill, i) => (
                        <div
                          key={i}
                          className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <div className="text-teal font-semibold mb-3">
                  {member.role}
                </div>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full font-medium text-sm mb-6">
              <FaQuoteLeft className="text-teal" />
              <span>EDUCATOR TESTIMONIALS</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Trusted by Schools Across Eswatini
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-teal/30 transition-all"
              >
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-lg text-gray-300 mb-8 italic">
                  &quot;{testimonial.quote}&quot;
                </p>

                <div className="pt-6 border-t border-white/10">
                  <div className="font-bold text-lg">{testimonial.author}</div>
                  <div className="text-gray-400 mb-2">{testimonial.role}</div>
                  <div className="inline-block px-3 py-1 bg-teal/20 text-teal rounded-full text-sm">
                    {testimonial.tour}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">
                Accreditations & Partnerships
              </h2>
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between py-4 border-b border-white/10 last:border-0"
                  >
                    <div className="font-semibold">{cert.name}</div>
                    <div className="text-gray-400 text-sm">{cert.year}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-linear-to-br from-teal/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-10 border border-teal/30">
              <h3 className="text-2xl font-bold mb-6">Partner With Us</h3>
              <p className="text-gray-300 mb-8">
                We collaborate with schools, educational institutions, and
                conservation organizations to create custom programs that meet
                specific learning objectives.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-r from-teal to-emerald-500 flex items-center justify-center">
                    <FaHandsHelping className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold">School Partnerships</div>
                    <div className="text-sm text-gray-400">
                      Custom tours aligned with your curriculum
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-r from-teal to-emerald-500 flex items-center justify-center">
                    <FaLeaf className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold">Conservation Partners</div>
                    <div className="text-sm text-gray-400">
                      Supporting local environmental initiatives
                    </div>
                  </div>
                </div>
              </div>

              <button className="mt-10 px-8 py-4 border-2 border-teal text-teal rounded-full font-bold hover:bg-teal hover:text-white transition-colors w-full">
                Become a Partner School
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-linear-to-br from-navy-800/60 to-navy-900/80 backdrop-blur-sm rounded-3xl p-12 border border-white/10 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Students&apos; Learning Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Contact our educational consultants to design the perfect tour for
              your school
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-linear-to-r from-greenYellow to-yellow-500 text-navy font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105">
                Schedule a Consultation
              </button>
              <button className="px-8 py-4 border-2 border-white/20 backdrop-blur-sm rounded-full font-semibold hover:bg-white/10 transition-colors">
                Download School Brochure
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
