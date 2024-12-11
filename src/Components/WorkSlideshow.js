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



export default function WorkSlideShow() {
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
    <div className="min-h-screen w-full bg-white text-black p-10 md:px-20">
        <section className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end w-full">
          <div className="mb-4 md:mb-0">
            <h2 className="ext-2xl md:text-4xl font-medium leading-tight ">
              Your Designs,
              Rendered to Perfection
            </h2>
          </div>
        </section>
        <section className="relative">
          <div className="mb-8">
            <motion.img
              src={images[currentImageIndex]}
              alt="Featured artwork"
              className="w-full h-[60vh] object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div 
            ref={scrollRef}
            className="flex space-x-2 overflow-x-auto scrollbar-hide"
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Artwork ${index + 1}`}
                className={`w-32 h-40 object-cover cursor-pointer rounded-lg ${
                  index === currentImageIndex ? 'border-2 border-white' : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </section>

    </div>
  );
}
