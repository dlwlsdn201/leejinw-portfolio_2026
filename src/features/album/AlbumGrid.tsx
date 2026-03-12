import { Image } from 'primereact/image';

// src/assets/album 내부의 확장자가 일치하는 이미지들을 일괄적으로 가져옵니다.
// HEIC 및 DNG는 브라우저에서 직접 렌더링되지 않으므로, 일반적인 웹 이미지 포맷만 필터링합니다.
const imagesGlob = import.meta.glob<{ default: string | { src: string } }>('../../assets/album/*.{jpeg,jpg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP}', { eager: true });

const ALBUM_PHOTOS = Object.values(imagesGlob).map((img, idx) => {
  const defaultExport = img.default;
  // Astro 3+ 환경에서는 ImageMetadata 객체가 반환되어 .src 속성에 경로가 담깁니다.
  const src = typeof defaultExport === 'string' ? defaultExport : defaultExport.src;
  
  return {
    itemImageSrc: src,
    alt: `Album Photo ${idx + 1}`
  };
});

export default function AlbumGrid() {
  return (
    <div className="grid mobile:grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4 gap-6 w-[60%] desktop:w-[80%] mt-6 mx-auto">
      {ALBUM_PHOTOS.map((photo, index) => (
        <div key={index} className="overflow-hidden rounded-lg relative group w-full aspect-3/4 shadow-md bg-dark-surface/50 border border-gray-800">
          <Image
            src={photo.itemImageSrc}
            alt={photo.alt}
            preview
            
            indicatorIcon={<i className='pi pi-arrow-up-right-and-arrow-down-left-from-center'></i>}
            className="w-full h-full object-fill"
            imageClassName="w-full h-full object-fill transition-transform duration-500 group-hover:scale-110"
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
