import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controls = useAnimation();
  const menuButtonRef = useRef(null);
  const overlayRef = useRef(null);
  const closeButtonRef = useRef(null);

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

  const animateMenuButton = (isOpen) => {
    anime({
      targets: menuButtonRef.current.querySelectorAll('.menu-line'),
      translateX: isOpen ? [0, '100%'] : ['100%', 0],
      opacity: isOpen ? [1, 0] : [0, 1],
      delay: anime.stagger(100),
      easing: 'easeInOutQuad',
      duration: 300
    });
  };

  const animateOverlay = (isOpen) => {
    anime({
      targets: overlayRef.current,
      translateY: isOpen ? ['100%', 0] : [0, '100%'],
      easing: 'easeInOutQuad',
      duration: 300
    });

    // Animate close button
    anime({
      targets: closeButtonRef.current,
      opacity: isOpen ? [0, 1] : [1, 0],
      scale: isOpen ? [0.5, 1] : [1, 0.5],
      easing: 'easeInOutQuad',
      duration: 300,
      delay: isOpen ? 150 : 0
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    animateMenuButton(!isMenuOpen);
    animateOverlay(!isMenuOpen);
    
    // Disable/enable scroll when overlay is opened/closed
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <motion.header 
        className={`flex justify-between items-center py-4 px-8 md:px-16 fixed top-0 left-0 right-0 z-50 ${isMenuOpen ? 'bg-transparent' : 'bg-white'}`}
        initial={{ y: 0 }}
        animate={controls}
      >
        <div className="text-lg font-bold"><Link to="/">ARQVIZ</Link></div>
        <nav className="relative">
          {isMobile ? (
            <button
              ref={menuButtonRef}
              className="w-5 h-4 flex flex-col justify-between"
              onClick={toggleMenu}
            >
              <span className="menu-line w-full h-0.5 bg-black"></span>
              <span className="menu-line w-full h-0.5 bg-black"></span>
              <span className="menu-line w-full h-0.5 bg-black"></span>
            </button>
          ) : (
            <ul className="flex space-x-6">
              <li className='hover:underline transition duration-300'><Link to="/work">WORK</Link></li>
              <li className='hover:underline transition duration-300'><Link to="/about">ABOUT</Link></li>
              <li className='hover:underline transition duration-300'><Link to="/contact">CONTACT</Link></li>
            </ul>
          )}
        </nav>
      </motion.header>
      {isMobile && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 bg-white z-40 flex items-center justify-center transform translate-y-full"
        >
          <button
            ref={closeButtonRef}
            className="absolute top-4 right-8 text-3xl"
            onClick={toggleMenu}
          >
            &times;
          </button>
          <ul className="text-5xl space-y-12 text-center font-light">
            <li className='hover:underline transition duration-300'><Link to="/work" onClick={toggleMenu}>WORK</Link></li>
            <li className='hover:underline transition duration-300'><Link to="/about" onClick={toggleMenu}>ABOUT</Link></li>
            <li className='hover:underline transition duration-300'><Link to="/contact" onClick={toggleMenu}>CONTACT</Link></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;