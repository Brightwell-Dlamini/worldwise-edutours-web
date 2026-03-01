'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaFilter,
  FaCalendarAlt,
  FaCrown,
  FaLandmark,
  FaSeedling,
  FaHandshake,
} from 'react-icons/fa';
import { GiLion, GiTreehouse, GiAfrica } from 'react-icons/gi';

// Eswatini-themed destination data
const destinations = [
  {
    id: 1,
    name: 'Royal Kingdom of Eswatini',
    region: 'Southern Africa',
    description:
      'Immerse in authentic Swati culture, royal heritage, and breathtaking mountain landscapes.',
    image: '/destinations/eswatini-royal.jpg',
    programs: ['Cultural Immersion', 'Heritage Tours', 'Community Exchange'],
    duration: '5-7 days',
    season: 'Mar-Oct',
    highlights: [
      'Lobamba Royal Village',
      'Mantenga Cultural Village',
      'Sibebe Rock',
      'Mlilwane Wildlife Sanctuary',
    ],
    priceRange: 'SZL 8,000-15,000',
    featured: true,
    premium: true,
    slug: 'eswatini-kingdom',
  },
  {
    id: 2,
    name: 'Mbabane & Ezulwini Valley',
    region: 'Hhohho Region',
    description:
      'Explore the capital city and "Valley of Heaven" with luxury resorts and craft markets.',
    image: '/destinations/mbabane-valley.jpg',
    programs: ['Urban Exploration', 'Educational Tours', 'Leadership Programs'],
    duration: '3-5 days',
    season: 'Year-round',
    highlights: [
      'Swazi Candles Centre',
      'Ezulwini Craft Market',
      'Mbabane Government Complex',
      'Royal Swazi Spa',
    ],
    priceRange: 'SZL 6,000-12,000',
    featured: true,
    premium: false,
    slug: 'mbabane-ezulwini',
  },
  {
    id: 3,
    name: 'Malkerns & Nsoko Villages',
    region: 'Manzini Region',
    description:
      'Agricultural heartland with pineapple farms and authentic rural community experiences.',
    image: '/destinations/malkerns.jpg',
    programs: [
      'Agricultural Education',
      'Community Service',
      'Cultural Exchange',
    ],
    duration: '4-6 days',
    season: 'Year-round',
    highlights: [
      'Malkerns Valley Farms',
      'Mantenga Handicrafts',
      'Nsoko Rural Schools',
      'Local Farmer Markets',
    ],
    priceRange: 'SZL 5,000-10,000',
    featured: true,
    premium: false,
    slug: 'malkerns-nsoko',
  },
  {
    id: 4,
    name: 'Hlane Royal National Park',
    region: 'Lubombo Region',
    description:
      'Majestic wildlife sanctuary with lion, elephant, and rhino conservation programs.',
    image: '/destinations/hlane-park.jpg',
    programs: ['Wildlife Conservation', 'Eco-Tourism', 'Biology Studies'],
    duration: '2-4 days',
    season: 'May-Sep',
    highlights: [
      'Big Five Safari',
      'Conservation Center',
      'Bird Watching',
      'Bush Walks',
    ],
    priceRange: 'SZL 7,000-14,000',
    featured: false,
    premium: true,
    slug: 'hlane-national-park',
  },
  {
    id: 5,
    name: 'Siteki & Lubombo Mountains',
    region: 'Lubombo Region',
    description:
      'Scenic mountain region with panoramic views and traditional healing heritage.',
    image: '/destinations/lubombo.jpg',
    programs: ['Geography Tours', 'Traditional Medicine', 'Hiking Expeditions'],
    duration: '3-5 days',
    season: 'Apr-Oct',
    highlights: [
      'Lubombo Mountain Trail',
      'Siteki Training Colleges',
      'Traditional Healers',
      'Panoramic Views',
    ],
    priceRange: 'SZL 4,500-9,000',
    featured: false,
    premium: false,
    slug: 'siteki-lubombo',
  },
  {
    id: 6,
    name: 'Ngwenya Glass & Mines',
    region: 'Hhohho Region',
    description:
      "Visit Africa's oldest mine and watch artisans create beautiful recycled glass art.",
    image: '/destinations/ngwenya.jpg',
    programs: ['Art & Design', 'Industrial Tours', 'Sustainability Education'],
    duration: '1-2 days',
    season: 'Year-round',
    highlights: [
      'Ngwenya Glass Factory',
      'Ancient Iron Ore Mine',
      'Artisan Workshops',
      'Recycling Center',
    ],
    priceRange: 'SZL 2,500-5,000',
    featured: false,
    premium: false,
    slug: 'ngwenya-glass',
  },
  {
    id: 7,
    name: 'Maguga Dam & Phophonyane',
    region: 'Hhohho Region',
    description:
      'Engineering marvel and nature reserve with waterfalls and indigenous forests.',
    image: '/destinations/maguga.jpg',
    programs: [
      'Engineering Tours',
      'Environmental Studies',
      'Adventure Education',
    ],
    duration: '2-3 days',
    season: 'Mar-Nov',
    highlights: [
      'Maguga Dam Tour',
      'Phophonyane Falls',
      'Nature Reserve',
      'Indigenous Flora',
    ],
    priceRange: 'SZL 3,500-7,000',
    featured: false,
    premium: false,
    slug: 'maguga-phophonyane',
  },
  {
    id: 8,
    name: 'Shewula Mountain Camp',
    region: 'Lubombo Region',
    description:
      'Community-owned eco-tourism project with authentic Swati homestay experiences.',
    image: '/destinations/shewula.jpg',
    programs: ['Community Tourism', 'Homestay Programs', 'Cultural Immersion'],
    duration: '3-4 days',
    season: 'Year-round',
    highlights: [
      'Mountain Camp Stay',
      'Community Projects',
      'Traditional Cooking',
      'Guided Village Tours',
    ],
    priceRange: 'SZL 4,000-8,000',
    featured: true,
    premium: false,
    slug: 'shewula-camp',
  },
];

const regions = [
  'All Regions',
  'Hhohho Region',
  'Manzini Region',
  'Lubombo Region',
  'Shiselweni Region',
];
const programTypes = [
  'All Programs',
  'Cultural Immersion',
  'Educational Tours',
  'Wildlife Conservation',
  'Community Exchange',
  'Leadership Programs',
  'Agricultural Education',
  'Adventure Education',
];
const priceRanges = [
  'All Prices',
  'Under SZL 5,000',
  'SZL 5,000-10,000',
  'SZL 10,000-15,000',
  'SZL 15,000+',
];

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [sortBy, setSortBy] = useState('featured');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  // Filter destinations
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      destination.highlights.some((h) =>
        h.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesRegion =
      selectedRegion === 'All Regions' || destination.region === selectedRegion;

    const matchesProgram =
      selectedProgram === 'All Programs' ||
      destination.programs.some((program) => program === selectedProgram);

    const matchesPrice = () => {
      if (selectedPrice === 'All Prices') return true;
      if (selectedPrice === 'Under SZL 5,000') {
        const price = parseInt(
          destination.priceRange
            .split('-')[0]
            .replace('SZL ', '')
            .replace(',', '')
        );
        return price < 5000;
      }
      if (selectedPrice === 'SZL 5,000-10,000') {
        const min = parseInt(
          destination.priceRange
            .split('-')[0]
            .replace('SZL ', '')
            .replace(',', '')
        );
        const max = parseInt(
          destination.priceRange.split('-')[1]?.replace(',', '') ||
            min.toString()
        );
        return min >= 5000 && max <= 10000;
      }
      if (selectedPrice === 'SZL 10,000-15,000') {
        const min = parseInt(
          destination.priceRange
            .split('-')[0]
            .replace('SZL ', '')
            .replace(',', '')
        );
        const max = parseInt(
          destination.priceRange.split('-')[1]?.replace(',', '') ||
            min.toString()
        );
        return min >= 10000 && max <= 15000;
      }
      if (selectedPrice === 'SZL 15,000+') {
        const min = parseInt(
          destination.priceRange
            .split('-')[0]
            .replace('SZL ', '')
            .replace(',', '')
        );
        return min >= 15000;
      }
      return true;
    };

    const matchesPremium = !showPremiumOnly || destination.premium;

    return (
      matchesSearch &&
      matchesRegion &&
      matchesProgram &&
      matchesPrice() &&
      matchesPremium
    );
  });

  // Sort destinations
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (sortBy === 'featured') {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      if (a.premium && !b.premium) return -1;
      if (!a.premium && b.premium) return 1;
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') {
      const priceA = parseInt(
        a.priceRange.split('-')[0].replace('SZL ', '').replace(',', '')
      );
      const priceB = parseInt(
        b.priceRange.split('-')[0].replace('SZL ', '').replace(',', '')
      );
      return priceA - priceB;
    }
    return 0;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('All Regions');
    setSelectedProgram('All Programs');
    setSelectedPrice('All Prices');
    setSortBy('featured');
    setShowPremiumOnly(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-r from-emerald-700 via-green-600 to-teal-600 py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/patterns/swazi-pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <GiLion className="text-amber-300 text-3xl" />
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                Proudly Eswatini
              </span>
            </div>

            <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Discover <span className="text-amber-300">Eswatini&apos;s</span>
              <br />
              Educational Treasures
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-10 font-light max-w-2xl">
              Immerse in authentic Swati culture, royal heritage, and
              transformative learning experiences across the Mountain Kingdom.
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-2xl group">
              <div className="absolute -inset-1 bg-linear-to-r from-amber-400 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-emerald-600 z-10" />
                <input
                  type="text"
                  placeholder="Search by destination, program, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-5 rounded-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl focus:outline-none focus:ring-3 focus:ring-emerald-400 text-gray-800 dark:text-white text-lg placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sophisticated Filter Section */}
      <section className="py-10 border-b border-emerald-100/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Enhanced Stats */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                  <GiAfrica className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white font-serif">
                    {destinations.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Eswatini Destinations
                  </p>
                </div>
              </div>

              <div className="h-12 w-px bg-gray-200 dark:bg-gray-700"></div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-linear-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg">
                  <FaCrown className="text-white text-2xl" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white font-serif">
                    {destinations.filter((d) => d.premium).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Premium Experiences
                  </p>
                </div>
              </div>
            </div>

            {/* Advanced Filter Controls */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full lg:w-auto">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-xl">
                  <FaFilter className="text-emerald-600 dark:text-emerald-400" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Filters:
                  </span>
                </div>

                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-emerald-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm min-w-[180px]"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-emerald-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm min-w-[200px]"
                >
                  {programTypes.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>

                <div className="flex gap-3">
                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-emerald-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm min-w-[180px]"
                  >
                    {priceRanges.map((price) => (
                      <option key={price} value={price}>
                        {price}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-emerald-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
                  >
                    <option value="featured">Featured First</option>
                    <option value="name">Name A-Z</option>
                    <option value="price">Price (Low to High)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={showPremiumOnly}
                      onChange={(e) => setShowPremiumOnly(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                        showPremiumOnly
                          ? 'bg-linear-to-r from-amber-500 to-orange-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                          showPremiumOnly ? 'translate-x-6' : ''
                        }`}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <FaCrown className="text-amber-500" />
                    Premium Only
                  </span>
                </label>

                <button
                  onClick={resetFilters}
                  className="px-5 py-3 rounded-xl border border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors shadow-sm"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxurious Destinations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Curated <span className="text-emerald-600">Eswatini</span>{' '}
              Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Each destination is handpicked to offer authentic cultural
              immersion and educational excellence
            </p>

            <div className="mt-8 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Featured
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Premium
                </span>
              </div>
            </div>
          </div>

          {sortedDestinations.length === 0 ? (
            <div className="text-center py-24 bg-linear-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center">
                  <FaSearch className="text-4xl text-emerald-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
                  No destinations match your criteria
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Try adjusting your filters or explore all our Eswatini
                  destinations
                </p>
                <button
                  onClick={resetFilters}
                  className="px-8 py-3 bg-linear-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                >
                  Show All Destinations
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                >
                  {/* Premium Badge */}
                  {destination.premium && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-linear-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                        <FaCrown className="w-3 h-3" />
                        PREMIUM
                      </div>
                    </div>
                  )}

                  {/* Image with Gradient Overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent z-10"></div>
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {destination.priceRange}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          per person
                        </p>
                      </div>
                    </div>

                    {/* Region Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-emerald-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        {destination.region}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {destination.name}
                      </h3>
                      {destination.featured && (
                        <div className="flex items-center gap-1 text-amber-500">
                          <FaStar className="w-4 h-4" />
                          <span className="text-sm font-semibold">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {destination.description}
                    </p>

                    {/* Programs */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                        Available Programs
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {destination.programs.map((program, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-linear-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-200 dark:border-emerald-800"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <FaCalendarAlt className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Duration
                          </span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {destination.duration}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <GiTreehouse className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Best Season
                          </span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {destination.season}
                        </p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                        Key Highlights
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights
                          .slice(0, 3)
                          .map((highlight, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-linear-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700"
                            >
                              {highlight}
                            </span>
                          ))}
                        {destination.highlights.length > 3 && (
                          <span className="px-3 py-1.5 bg-linear-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700">
                            +{destination.highlights.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="group/btn block w-full text-center"
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <div className="absolute inset-0 bg-linear-to-r from-emerald-600 to-teal-600 group-hover/btn:from-emerald-700 group-hover/btn:to-teal-700 transition-all duration-300"></div>
                        <div className="relative px-6 py-4 flex items-center justify-center gap-3">
                          <span className="text-white font-bold text-lg">
                            Explore Experience
                          </span>
                          <FaArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-900 via-green-800 to-teal-900"></div>
        <div className="absolute inset-0 bg-[url('/patterns/swazi-bg.svg')] opacity-10"></div>

        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-3 mb-8">
            <GiLion className="text-amber-300 text-4xl" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
              Begin Your Swati Journey
            </h2>
          </div>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Partner with Eswatini&apos;s premier educational tourism experts. We
            create bespoke experiences that connect students with authentic
            Swati culture and heritage.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="group relative px-10 py-4 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-orange-500 group-hover:scale-105 transition-transform duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                <FaHandshake className="text-white text-xl" />
                <span className="text-white font-bold text-lg">
                  Schedule Consultation
                </span>
              </div>
            </Link>

            <Link
              href="/custom-tour"
              className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              Design Custom Tour
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/80 text-sm">
              All prices in Emalangeni (SZL) • VAT included • Flexible payment
              options available
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-linear-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why <span className="text-emerald-600">Eswatini</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover the unique advantages of educational tourism in
              Africa&apos;s last absolute monarchy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl flex items-center justify-center">
                  <FaLandmark className="text-emerald-600 dark:text-emerald-400 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  Royal Heritage Access
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Exclusive access to cultural sites and royal villages with
                  official permission
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-amber-500 to-orange-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center">
                  <FaSeedling className="text-amber-600 dark:text-amber-400 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  Sustainable Tourism
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Community-owned projects that directly benefit local Swati
                  communities
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center">
                  <FaGraduationCap className="text-green-600 dark:text-green-400 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  Accredited Programs
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Curriculum-aligned educational experiences approved by
                  Eswatini Ministry of Education
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-teal-500 to-cyan-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 rounded-2xl flex items-center justify-center">
                  <FaUsers className="text-teal-600 dark:text-teal-400 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                  Cultural Immersion
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Authentic interactions with Swati communities, traditions, and
                  daily life
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
