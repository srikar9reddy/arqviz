import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const slides = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade in the initial slide
      tl.from('.slideshow-image', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });

      // Animate text
      tl.from('.hero-text > span', {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      }, "-=0.5");

      // Animate buttons
      tl.from('.hero-buttons', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power2.out',
      }, "-=0.5");

    }, heroRef);

    // Slideshow auto-advance
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => {
      ctx.revert();
      clearInterval(slideInterval);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      ref={heroRef}
      className='min-h-[100vh] w-full flex justify-between items-center relative overflow-hidden'
      style={{ opacity: heroOpacity }}
    >
      <div className='h-full w-full flex flex-col justify-center items-center bg-transparent text-black relative z-10'>
        <h1 ref={textRef} className='hero-text text-center leading-tight tracking-tight mb-4 mt-8 max-w-4xl mx-auto'>
          {/* Slideshow */}
          <div className="w-full h-[60vh] my-8 relative overflow-hidden rounded-sm shadow-2xl">
            {slides.map((slide, index) => (
              <motion.img
                key={index}
                src={slide}
                alt={`Slide ${index + 1}`}
                className={`slideshow-image w-full h-full object-cover absolute top-0`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            ))}
          </div>
          {/* <span className='font-serif italic text-3xl md:text-4xl block mb-2 text-gray-800'>The</span> */}
          <span className='text-4xl md:text-5xl font-medium block mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'>Advanced 3D Modelling & Rendering</span>
          <span className='font-serif italic text-2xl font-light md:text-4xl block text-gray-800'>For Architects & Developers </span>
        </h1>

        {/* Buttons */}
        <div className='hero-buttons flex justify-between w-full mt-8'>
          <button onClick={() => scrollToSection('work')} className='text-black px-10 md:px-20 py-3 underline'>View Portfolio</button>
          <button onClick={() => scrollToSection('contact')} className='text-black px-10 md:px-20 py-3 underline'>Get Quote</button>
        </div>
      </div>
    </motion.div>
  );
}