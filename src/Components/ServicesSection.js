import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const { scrollYProgress } = useScroll();
  const servicesY = useTransform(scrollYProgress, [0.5, 0.7], [100, 0]);
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const services = [
    {
      title: '3D Visualization',
      description: 'Bring your ideas to life with stunning 3D renderings.'
    },
    {
      title: 'Virtual Walkthroughs',
      description: 'Experience your space before its built with immersive virtual tours',
    },
    {
      title: 'VR Experiences',
      description: 'Step into your design with cutting-edge VR technology.',
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
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
      className='md:px-16 w-full min-h-screen flex flex-col  justify-center items-center relative overflow-hidden p-16 mt-12'
      style={{ y: servicesY }}
    >
      <div ref={textRef} className="text-left ">
        <h2 className='text-4xl md:text-6xl font-light mb-24 max-w-4xl'>
          See your <span className="font-serif italic">vision</span> come to life with <span className="font-serif italic">unparalleled clarity</span>.
        </h2>
        <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-16 md:space-y-0 md:space-x-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative flex-1 text-left"
            >
              <h3 className="text-3xl font-light mb-4">{service.title}</h3>
              <p className="text-xl font-light">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}