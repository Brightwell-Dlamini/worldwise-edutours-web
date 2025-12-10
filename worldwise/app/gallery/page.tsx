import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery | WorldWise Educational Tours',
  description:
    'Real moments from our educational tours across Eswatini and beyond',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
