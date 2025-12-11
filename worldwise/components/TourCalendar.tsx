'use client';

import { useState } from 'react';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaChevronRight,
  FaStar,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function TourCalendar() {
  const [selectedTour, setSelectedTour] = useState<string>('eco-mar');
  const [bookmarkedTours, setBookmarkedTours] = useState<string[]>([
    'eco-mar',
    'science-jun',
  ]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isGridView, setIsGridView] = useState<boolean>(true);

  const tours = [
    {
      id: 'eco-mar',
      title: 'Ecology & Conservation Expedition',
      date: 'March 15-20, 2025',
      duration: '6 days',
      location: 'Mlilwane Wildlife Sanctuary',
      groupSize: '15-25 students',
      ageRange: 'Grades 10-12',
      availability: '8 spots left',
      price: 'From E8,500',
      status: 'open',
      highlight: 'Most Popular',
      category: 'science',
      difficulty: 'Moderate',
      rating: 4.9,
      reviews: 42,
      description:
        "An immersive exploration of Eswatini's ecosystems, focusing on conservation, biodiversity, and sustainable practices.",
      itinerary: [
        'Wildlife tracking',
        'Conservation workshops',
        'Ecosystem analysis',
        'Night safari',
      ],
      imageColor: 'from-emerald-500 to-teal',
    },
    {
      id: 'culture-apr',
      title: 'Cultural Heritage Discovery',
      date: 'April 10-13, 2025',
      duration: '4 days',
      location: 'Ezulwini Valley',
      groupSize: '20-30 students',
      ageRange: 'Grades 8-12',
      availability: 'Filling Fast',
      price: 'From E6,200',
      status: 'limited',
      highlight: 'New Program',
      category: 'cultural',
      difficulty: 'Easy',
      rating: 4.7,
      reviews: 28,
      description:
        'Deep dive into Swati traditions, crafts, music, and history with local community engagement.',
      itinerary: [
        'Traditional dance',
        'Craft workshops',
        'Historical sites',
        'Local cuisine',
      ],
      imageColor: 'from-amber-500 to-orange',
    },
    {
      id: 'leadership-may',
      title: 'Leadership Summit & Development',
      date: 'May 5-9, 2025',
      duration: '5 days',
      location: 'Mbabane & Surrounds',
      groupSize: '15-20 students',
      ageRange: 'Grades 11-12',
      availability: '12 spots left',
      price: 'From E7,800',
      status: 'open',
      highlight: '',
      category: 'leadership',
      difficulty: 'Challenging',
      rating: 4.8,
      reviews: 31,
      description:
        'Intensive leadership training with team-building exercises, public speaking, and project planning.',
      itinerary: [
        'Team challenges',
        'Guest speakers',
        'Strategy workshops',
        'Community project',
      ],
      imageColor: 'from-blue-500 to-indigo',
    },
    {
      id: 'science-jun',
      title: 'Advanced Science Exploration',
      date: 'June 20-25, 2025',
      duration: '6 days',
      location: 'Hlane Royal National Park',
      groupSize: '18-25 students',
      ageRange: 'Grades 9-11',
      availability: 'Early Bird',
      price: 'From E9,200',
      status: 'open',
      highlight: 'Save 15%',
      category: 'science',
      difficulty: 'Moderate',
      rating: 4.9,
      reviews: 56,
      description:
        'Hands-on scientific fieldwork in biodiversity hotspots with data collection and analysis.',
      itinerary: [
        'Field research',
        'Lab sessions',
        'Data analysis',
        'Conservation planning',
      ],
      imageColor: 'from-purple-500 to-pink',
    },
    {
      id: 'language-jul',
      title: 'Language & Cultural Immersion',
      date: 'July 8-12, 2025',
      duration: '5 days',
      location: 'Manzini Region',
      groupSize: '15-22 students',
      ageRange: 'All Grades',
      availability: 'Open',
      price: 'From E5,900',
      status: 'open',
      highlight: '',
      category: 'cultural',
      difficulty: 'Easy',
      rating: 4.6,
      reviews: 37,
      description:
        'Total immersion in SiSwati language with cultural activities and local family interactions.',
      itinerary: [
        'Language classes',
        'Market visits',
        'Home stays',
        'Cultural exchange',
      ],
      imageColor: 'from-rose-500 to-red',
    },
    {
      id: 'history-aug',
      title: 'Historical Journey Through Eswatini',
      date: 'August 14-18, 2025',
      duration: '5 days',
      location: 'Lobamba & Siteki',
      groupSize: '20-28 students',
      ageRange: 'Grades 10-12',
      availability: 'Coming Soon',
      price: 'TBA',
      status: 'upcoming',
      highlight: '',
      category: 'cultural',
      difficulty: 'Moderate',
      rating: 4.5,
      reviews: 19,
      description:
        'Tracing the rich history of the Swati nation from ancient times to modern day.',
      itinerary: [
        'Museum visits',
        'Archaeological sites',
        'Historical reenactments',
        'Documentary filming',
      ],
      imageColor: 'from-amber-700 to-yellow',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Tours' },
    { id: 'science', label: 'Science & Nature' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'open', label: 'Available Now' },
  ];

  const selectedTourData =
    tours.find((tour) => tour.id === selectedTour) || tours[0];

  const toggleBookmark = (tourId: string) => {
    if (bookmarkedTours.includes(tourId)) {
      setBookmarkedTours(bookmarkedTours.filter((id) => id !== tourId));
    } else {
      setBookmarkedTours([...bookmarkedTours, tourId]);
    }
  };

  const filteredTours = tours.filter((tour) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'open') return tour.status === 'open';
    return tour.category === activeFilter;
  });

  return (
    <section className="relative py-24 bg-linear-to-b from-navy-950 via-navy-900 to-navy-950 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-teal/5 blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-greenYellow/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full font-medium text-sm mb-6">
            <FaCalendarAlt className="text-teal" />
            <span>2025 TOUR CALENDAR</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Curated{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-greenYellow to-teal">
              Educational Expeditions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transformative learning journeys designed to inspire, educate, and
            connect students with the world around them
          </p>
        </motion.div>

        {/* Featured Tour */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTour}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="mb-16"
          >
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-navy-800/60 to-navy-900/80 backdrop-blur-sm border border-white/10 shadow-2xl">
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-linear-to-r ${selectedTourData.imageColor}/10 opacity-30`}
              ></div>

              <div className="relative p-10">
                <div className="flex flex-col lg:flex-row gap-10">
                  {/* Left side - Tour info */}
                  <div className="lg:w-2/3">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      {selectedTourData.highlight && (
                        <div className="px-4 py-2 bg-linear-to-r from-greenYellow to-yellow-500 text-navy rounded-full font-bold">
                          {selectedTourData.highlight}
                        </div>
                      )}
                      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full font-medium">
                        {selectedTourData.category.toUpperCase()} TOUR
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={() => toggleBookmark(selectedTourData.id)}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          aria-label="Bookmark"
                        >
                          {bookmarkedTours.includes(selectedTourData.id) ? (
                            <FaBookmark className="text-greenYellow w-5 h-5" />
                          ) : (
                            <FaRegBookmark className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <h2 className="text-4xl font-bold mb-4">
                      {selectedTourData.title}
                    </h2>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(selectedTourData.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-500'
                            }`}
                          />
                        ))}
                        <span className="ml-2 font-semibold">
                          {selectedTourData.rating}
                        </span>
                        <span className="text-gray-400 ml-1">
                          ({selectedTourData.reviews} reviews)
                        </span>
                      </div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      <div className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {selectedTourData.difficulty}
                      </div>
                    </div>

                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      {selectedTourData.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                      {[
                        {
                          icon: <FaCalendarAlt className="w-5 h-5" />,
                          label: 'Dates',
                          value: selectedTourData.date,
                        },
                        {
                          icon: <FaClock className="w-5 h-5" />,
                          label: 'Duration',
                          value: selectedTourData.duration,
                        },
                        {
                          icon: <FaMapMarkerAlt className="w-5 h-5" />,
                          label: 'Location',
                          value: selectedTourData.location,
                        },
                        {
                          icon: <FaUsers className="w-5 h-5" />,
                          label: 'Group Size',
                          value: selectedTourData.groupSize,
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-linear-to-r from-teal/20 to-emerald-500/20">
                              {item.icon}
                            </div>
                            <div className="text-sm text-gray-400">
                              {item.label}
                            </div>
                          </div>
                          <div className="font-semibold text-lg">
                            {item.value}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button className="px-8 py-4 bg-linear-to-r from-greenYellow to-yellow-500 text-navy font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2">
                        Reserve Now
                        <FaChevronRight />
                      </button>
                      <button className="px-8 py-4 border-2 border-white/20 backdrop-blur-sm rounded-full font-semibold hover:bg-white/10 transition-colors">
                        Download Itinerary
                      </button>
                    </div>
                  </div>

                  {/* Right side - Details card */}
                  <div className="lg:w-1/3">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
                      <h3 className="text-2xl font-bold mb-6">Tour Details</h3>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <span className="text-gray-300">Age Range:</span>
                          <span className="font-semibold text-lg">
                            {selectedTourData.ageRange}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <span className="text-gray-300">Availability:</span>
                          <span className="font-semibold text-greenYellow text-lg">
                            {selectedTourData.availability}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-white/10">
                          <span className="text-gray-300">
                            Price per Student:
                          </span>
                          <span className="text-3xl font-bold bg-linear-to-r from-teal to-emerald-400 bg-clip-text text-transparent">
                            {selectedTourData.price}
                          </span>
                        </div>
                        <div className="pt-4">
                          <h4 className="font-bold mb-3">
                            Itinerary Highlights
                          </h4>
                          <ul className="space-y-2">
                            {selectedTourData.itinerary.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-3 text-gray-300"
                              >
                                <div className="w-2 h-2 rounded-full bg-teal"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tour Browser */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
            <div>
              <h3 className="text-3xl font-bold mb-2">Explore All Tours</h3>
              <p className="text-gray-400">
                Select a tour to view detailed information
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Filter buttons */}
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full p-1">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === filter.id
                        ? 'bg-linear-to-r from-teal to-emerald-500 text-white'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full p-1">
                <button
                  onClick={() => setIsGridView(true)}
                  className={`p-2 rounded-full ${
                    isGridView ? 'bg-teal/20 text-teal' : 'hover:bg-white/10'
                  }`}
                  aria-label="Grid view"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsGridView(false)}
                  className={`p-2 rounded-full ${
                    !isGridView ? 'bg-teal/20 text-teal' : 'hover:bg-white/10'
                  }`}
                  aria-label="List view"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Tour Cards Grid/List */}
          <AnimatePresence mode="wait">
            {isGridView ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredTours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className={`relative rounded-2xl overflow-hidden border transition-all cursor-pointer group ${
                      selectedTour === tour.id
                        ? 'border-teal bg-linear-to-br from-teal/10 to-transparent'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedTour(tour.id)}
                  >
                    {/* Card background gradient */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${tour.imageColor}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>

                    <div className="relative p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          {tour.highlight && (
                            <div className="inline-block px-3 py-1 bg-linear-to-r from-greenYellow to-yellow-500 text-navy rounded-full text-xs font-bold mb-3">
                              {tour.highlight}
                            </div>
                          )}
                          <h4 className="text-xl font-bold mb-2">
                            {tour.title}
                          </h4>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(tour.id);
                          }}
                          className="p-2 hover:bg-white/10 rounded-full transition-colors"
                          aria-label="Bookmark"
                        >
                          {bookmarkedTours.includes(tour.id) ? (
                            <FaBookmark className="text-greenYellow w-4 h-4" />
                          ) : (
                            <FaRegBookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-gray-300">
                          <FaCalendarAlt className="w-4 h-4" />
                          <span>{tour.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <FaMapMarkerAlt className="w-4 h-4" />
                          <span>{tour.location}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-2xl font-bold bg-linear-to-r from-teal to-emerald-400 bg-clip-text text-transparent">
                            {tour.price}
                          </div>
                          <div className="text-sm text-gray-400">
                            {tour.ageRange}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <FaStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium">
                              {tour.rating}
                            </span>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              tour.status === 'open'
                                ? 'bg-teal/20 text-teal'
                                : tour.status === 'limited'
                                ? 'bg-orange-500/20 text-orange-300'
                                : 'bg-gray-500/20 text-gray-300'
                            }`}
                          >
                            {tour.availability}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredTours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    className={`rounded-2xl p-6 border transition-all cursor-pointer group ${
                      selectedTour === tour.id
                        ? 'border-teal bg-linear-to-r from-teal/10 to-transparent'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedTour(tour.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="md:w-2/5">
                        <div className="flex items-center gap-4 mb-3">
                          {tour.highlight && (
                            <div className="px-3 py-1 bg-linear-to-r from-greenYellow to-yellow-500 text-navy rounded-full text-xs font-bold">
                              {tour.highlight}
                            </div>
                          )}
                          <span className="text-sm text-gray-400">
                            {tour.category.toUpperCase()}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(tour.id);
                            }}
                            className="ml-auto md:ml-0 p-2 hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Bookmark"
                          >
                            {bookmarkedTours.includes(tour.id) ? (
                              <FaBookmark className="text-greenYellow w-4 h-4" />
                            ) : (
                              <FaRegBookmark className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <h4 className="text-xl font-bold mb-2">{tour.title}</h4>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {tour.description}
                        </p>
                      </div>

                      <div className="md:w-2/5">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaCalendarAlt className="w-4 h-4" />
                            <span className="text-sm">{tour.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaMapMarkerAlt className="w-4 h-4" />
                            <span className="text-sm">{tour.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaClock className="w-4 h-4" />
                            <span className="text-sm">{tour.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <FaUsers className="w-4 h-4" />
                            <span className="text-sm">{tour.groupSize}</span>
                          </div>
                        </div>
                      </div>

                      <div className="md:w-1/5">
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-2xl font-bold bg-linear-to-r from-teal to-emerald-400 bg-clip-text text-transparent">
                            {tour.price}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <FaStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm font-medium">
                                {tour.rating}
                              </span>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                tour.status === 'open'
                                  ? 'bg-teal/20 text-teal'
                                  : tour.status === 'limited'
                                  ? 'bg-orange-500/20 text-orange-300'
                                  : 'bg-gray-500/20 text-gray-300'
                              }`}
                            >
                              {tour.availability}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Calendar & Custom Tour CTA */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Highlights */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h4 className="text-2xl font-bold mb-8">2025 Academic Calendar</h4>
            <div className="space-y-6">
              {[
                {
                  quarter: 'Term 1',
                  months: 'Jan - Mar',
                  tours: ['Ecology Expedition', 'Cultural Discovery'],
                  highlight: 'Best for Biology & Geography',
                },
                {
                  quarter: 'Term 2',
                  months: 'Apr - Jun',
                  tours: ['Leadership Summit', 'Science Exploration'],
                  highlight: 'Ideal for Team Building',
                },
                {
                  quarter: 'School Holidays',
                  months: 'Jul - Aug',
                  tours: ['Language Immersion', 'Historical Journey'],
                  highlight: 'Intensive Programs',
                },
                {
                  quarter: 'Term 4',
                  months: 'Sep - Nov',
                  tours: ['Year-End Expeditions', 'Special Topics'],
                  highlight: 'Final Term Focus',
                },
              ].map((period, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6 pb-6 border-b border-white/10 last:border-0 last:pb-0"
                >
                  <div className="min-w-24">
                    <div className="text-lg font-bold text-teal">
                      {period.quarter}
                    </div>
                    <div className="text-sm text-gray-400">{period.months}</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">
                      {period.tours.join(', ')}
                    </div>
                    <div className="text-sm text-gray-400">
                      {period.highlight}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Custom Tour CTA */}
          <div className="bg-linear-to-br from-teal/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-8 border border-teal/30 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-teal/5 blur-3xl"></div>
            <div className="relative">
              <h4 className="text-2xl font-bold mb-4">
                Tailored Educational Experiences
              </h4>
              <p className="text-gray-300 mb-8">
                Our expert team can design custom tours aligned with your
                curriculum, schedule, and learning objectives.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  {
                    feature: 'Curriculum Alignment',
                    detail: 'Match with specific learning outcomes',
                  },
                  {
                    feature: 'Flexible Scheduling',
                    detail: 'Dates that work for your school',
                  },
                  {
                    feature: 'Custom Activities',
                    detail: 'Tailored workshops and excursions',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-linear-to-r from-teal to-emerald-500 flex items-center justify-center">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">{item.feature}</div>
                      <div className="text-sm text-gray-400">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="group px-8 py-4 bg-linear-to-r from-teal to-emerald-500 text-white font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-3">
                Request Custom Tour
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
