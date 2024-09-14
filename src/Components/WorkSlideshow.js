import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://i.imgur.com/zEivwNS.png',
  'https://i.imgur.com/BBL4RQe.jpeg',
  'https://i.imgur.com/vimagzm.jpeg',
  'https://i.imgur.com/HR84tsX.jpeg',
  'https://i.imgur.com/SLSmHFx.jpeg',
  'https://i.imgur.com/ocL3eLv.png',
];



export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: currentImageIndex * 100,
        behavior: 'smooth',
      });
    }
  }, [currentImageIndex]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-white text-black py-12">
        <section className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end w-full">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl leading-tight mb-2">
              Your Designs,
              Rendered to Perfection
            </h1>
            <p className="text-sm">
            Redefining 3D rendering with breathtaking visualizations—crafted for designers, architects, and builders.
            </p>
          </div>
        </section>
        <section className="relative">
          <div className="mb-8">
            <motion.img
              src={images[currentImageIndex]}
              alt="Featured artwork"
              className="w-full h-[60vh] object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div 
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide"
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Artwork ${index + 1}`}
                className={`w-32 h-40 object-cover cursor-pointer ${
                  index === currentImageIndex ? 'border-2 border-black' : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </section>

    </div>
  );
}
