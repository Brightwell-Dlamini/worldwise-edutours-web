'use client';

import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Image from 'next/image';

const photos = [
  {
    src: '/assets/tour1.jpg',
    alt: 'City-to-City Tour – Matsapha Market',
    width: 800,
    height: 600,
  },
  {
    src: '/assets/tour2.jpg',
    alt: 'Mlilwane Wildlife Sanctuary',
    width: 600,
    height: 800,
  },
  {
    src: '/assets/tour3.jpg',
    alt: 'Mozambique 3-Day Science Tour',
    width: 800,
    height: 600,
  },
  {
    src: '/assets/tour4.jpg',
    alt: 'Students at Mantenga Cultural Village',
    width: 600,
    height: 800,
  },
];

export default function GalleryClient() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative py-32 bg-navy text-white text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6">
            Real Moments, Real Impact
          </h1>
          <p className="text-2xl opacity-90">
            See what our students experience on every tour
          </p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-neutralGray/10">
        <div className="max-w-7xl mx-auto">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="20px">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-500 object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8Alt4p6o2k0j4v8A0e6I2S4w1Y4sO8P5H/9k="
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-navy/80 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-medium">{photo.alt}</p>
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-4xl font-bold z-10 hover:text-teal"
            >
              ×
            </button>
            <Image
              src={photos[selectedImage].src}
              alt={photos[selectedImage].alt}
              width={1200}
              height={800}
              className="w-auto h-auto max-h-screen max-w-full object-contain"
              priority
            />
            <p className="text-white text-center mt-4 text-lg font-medium">
              {photos[selectedImage].alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
