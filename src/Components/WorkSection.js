import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://i.imgur.com/zEivwNS.png',
  'https://i.imgur.com/BBL4RQe.jpeg',
  'https://i.imgur.com/vimagzm.jpeg',
];

const sections = [
  { title: "Your Designs", subtitle: "Scroll to Explore" },
  { title: "Rendered to Perfection", subtitle: "Discover More" },
  { title: "Breathtaking Visualizations", subtitle: "Continue Your Journey" }
];

export default function WorkSection() {
  const sectionRefs = useRef(sections.map(() => React.createRef()));
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            const index = sectionRefs.current.findIndex(ref => ref.current === entry.target);
            setActiveIndex(index);
            setVisibleSections(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.8 }
    );

    sectionRefs.current.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="relative">
      {sections.map((section, index) => (
        <div
          key={index}
          ref={sectionRefs.current[index]}
          className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: activeIndex === index ? 1 : 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={images[index]}
              alt={section.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </motion.div>
          <motion.div
            className="p-8 rounded-lg text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: visibleSections.includes(index) ? 1 : 0,
              y: visibleSections.includes(index) ? 0 : 20
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-5xl text-white mb-4 font-bold tracking-wide">{section.title}</h2>
            <p className="text-xl text-white font-light">{section.subtitle}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
