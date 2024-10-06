import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClientsSection = () => {
  const sectionRef = useRef(null);
  const clientsRef = useRef(null);

  const clients = [
    { name: 'Client 1', logo: 'https://via.placeholder.com/150?text=Client+1' },
    { name: 'Client 2', logo: 'https://via.placeholder.com/150?text=Client+2' },
    { name: 'Client 3', logo: 'https://via.placeholder.com/150?text=Client+3' },
    { name: 'Client 4', logo: 'https://via.placeholder.com/150?text=Client+4' },
    { name: 'Client 5', logo: 'https://via.placeholder.com/150?text=Client+5' },
    { name: 'Client 6', logo: 'https://via.placeholder.com/150?text=Client+6' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(clientsRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div 
      ref={sectionRef}
      className='w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden p-16'
    >
      <h2 className='text-4xl md:text-6xl font-light mb-24 text-center'>
        Trusted by <span className="font-serif italic">industry leaders</span>
      </h2>
      <div 
        ref={clientsRef} 
        className="grid grid-cols-2 md:grid-cols-3 gap-16 items-center justify-items-center"
      >
        {clients.map((client, index) => (
          <div key={index} className="w-32 h-32 flex items-center justify-center">
            <img 
              src={client.logo} 
              alt={client.name} 
              className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ClientsSection;
