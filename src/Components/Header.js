import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <header className="flex justify-between items-center mb-8" >
        <div className="text-lg font-bold" ><Link to="/">ARQVIZ</Link></div>
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
    </header>
  );
};

export default Header;