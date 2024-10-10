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

  return (
    <div ref={sectionRef} className="bg-white p-8 md:p-16 w-full font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <h2 ref={subtitleRef} className="text-2xl md:text-3xl font-medium mb-6 leading-tight md:max-w-md">
            Turn your ideas into awe-inspiring visual narratives that command attention and drive action.
          </h2>

          <div ref={textRef} className="flex flex-col">
            <p className="text-md mb-12 leading-relaxed md:max-w-md">
              At Arqviz, we don't just create visuals; we craft bespoke aesthetics tailored to each project's needs. We empathize deeply with the end user, ensuring that every interactive experience and visualization we create resonates on a profound level. By understanding the nuances of human perception and behavior, we transform architectural concepts into compelling visual narratives that not only showcase spaces but also evoke emotions and inspire action.
            </p>

            <p className="text-sm font-semibold mb-8">Our Holistic Approach</p>

            <div ref={linksRef} className="space-y-4">
              <a href="#" className="block text-sm underline">Discover Our User-Centric Design Process</a>
              <a href="#" className="block text-sm underline">Explore Our Psychological Approach to Visualization</a>
              <a href="#" className="block text-sm underline">See How We Tailor Aesthetics to Your Project</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}