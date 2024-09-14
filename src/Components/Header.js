import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);
          
          if (scrollDifference > 5) {  // Add a threshold to reduce sensitivity
            if (currentScrollY > lastScrollY) {
              // Scrolling down
              controls.start({ y: '-100%', transition: { duration: 0.1, ease: 'linear' } });
            } else {
              // Scrolling up
              controls.start({ y: 0, transition: { duration: 0.1, ease: 'linear' } });
            }
            lastScrollY = currentScrollY;
          }
          
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.header 
      className="flex justify-between items-center py-4 px-8 fixed top-0 left-0 right-0 z-50 bg-white"
      initial={{ y: 0 }}
      animate={controls}
    >
      <div className="text-lg font-bold"><Link to="/">ARQVIZ</Link></div>
      <nav className="relative">
        {isMobile && (
          <>
            <button
              className="text-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
            <motion.ul
              variants={variants}
              initial={false}
              animate={isMenuOpen ? 'visible' : 'hidden'}
              className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md py-2"
            >
              <li className="px-4 py-2"><Link to="/work">WORK</Link></li>
              <li className="px-4 py-2"><Link to="/about">ABOUT</Link></li>
              <li className="px-4 py-2"><Link to="/contact">CONTACT</Link></li>
            </motion.ul>
          </>
        )}
        {!isMobile && (
          <ul className="flex space-x-4">
            <li className="px-4 py-2"><Link to="/work">WORK</Link></li>
            <li className="px-4 py-2"><Link to="/about">ABOUT</Link></li>
            <li className="px-4 py-2"><Link to="/contact">CONTACT</Link></li>
          </ul>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;