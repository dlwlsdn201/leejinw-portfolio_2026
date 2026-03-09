import React from 'react';
import { Image } from 'primereact/image';

const MOCK_PHOTOS = [
  { itemImageSrc: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop', alt: 'Desk Setup' },
  { itemImageSrc: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop', alt: 'Coding' },
  { itemImageSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop', alt: 'Coffee' },
  { itemImageSrc: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop', alt: 'Meeting' },
  { itemImageSrc: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop', alt: 'Team' },
  { itemImageSrc: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', alt: 'Work' },
];

export default function AlbumGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mt-10">
      {MOCK_PHOTOS.map((photo, index) => (
        <div key={index} className="overflow-hidden rounded-lg relative group h-48 md:h-64 shadow-md bg-dark-surface/50 border border-gray-800">
          <Image
            src={photo.itemImageSrc}
            alt={photo.alt}
            preview
            className="w-full h-full object-cover"
            imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300 pointer-events-none"></div>
        </div>
      ))}
      <style>{`
        /* Style fixes for PrimeReact Image Preview in dark mode */
        .p-image-mask { background-color: rgba(0, 0, 0, 0.9); }
        .p-image-action { background: rgba(255, 255, 255, 0.1); color: #fff; margin: 0 0.5rem; transition: background 0.3s; }
        .p-image-action:hover { background: rgba(255, 255, 255, 0.2); }
      `}</style>
    </div>
  );
}
