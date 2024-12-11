import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from(textRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        delay: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from(linksRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        delay: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={sectionRef} className="bg-white p-10 md:p-20 w-full font-sans">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <h2 ref={subtitleRef} className="text-2xl md:text-4xl font-medium mb-6 leading-tight md:max-w-lg">
            Elevate Your Designs with Breathtaking 3D Visualizations That Inspire and Impress
          </h2>
          
          <div ref={textRef} className="flex flex-col">
            <p className="text-md mb-12 leading-relaxed md:max-w-md">
              At Arqviz, we turn architectural concepts into show-stopping 3D visualizations that captivate and convert. Using advanced rendering techniques and a deep understanding of user-centric design, we deliver visuals that go beyond aesthetics—they tell a story. From photorealistic interiors to immersive walkthroughs, our tailored 3D solutions are crafted to evoke emotions, showcase your vision, and make a lasting impact.
            </p>
    
            <p className="text-md font-semibold mb-4">Services</p>
            <div ref={linksRef} className="space-y-4">
              <a href="#" className="block text-md underline">
                Architectural Rendering
              </a>
              <a href="#" className="block text-md underline">
                3D Floor Plans
              </a>
              <a href="#" className="block text-md underline">
                Virtual Reality (VR) Walkthroughs
              </a>
              <a href="#" className="block text-md underline">
                Augmented Reality (AR) Integration
              </a>
              <a href="#" className="block text-md underline">
                Animation and Flythroughs
              </a>
              <a href="#" className="block text-md underline">
                Interior Styling and Visualization
              </a>
              <a href="#" className="block text-md underline">
                Product Visualization
              </a>
              <a href="#" className="block text-md underline">
                Marketing Collateral Design
              </a>
              <a href="#" className="block text-md underline">
                Urban Design and Masterplanning Visualization
              </a>
              <button onClick={() => scrollToSection('contact')} className="px-6 py-2 outline rounded-md hover:bg-black hover:text-white">
                Get a quotation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}