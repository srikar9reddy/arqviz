import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isContactPage = location.pathname === '/contact';

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // If we're not on the home page, navigate to home first
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const yOffset = -80;
          const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // If we're already on the home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        const yOffset = -80;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="bg-white text-black w-full mt-24 pt-12">

      {/* Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
          {/* Logo */}
          <div className="text-center sm:text-left">
            <Link to="/" className="text-2xl sm:text-3xl font-bold tracking-tight">ARQVIZ</Link>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-8">
              <li>
                <button 
                  onClick={() => scrollToSection('work')} 
                  className="hover:text-gray-300 transition duration-300"
                >
                  Work
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-gray-300 transition duration-300"
                >
                  About
                </button>
              </li>
              <li><button 
              onClick={()=> scrollToSection('contact')}
              className="hover:text-gray-300 transition duration-300">Contact</button></li>
            </ul>
          </nav>

          {/* Social Links */}
          {/* <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-300 transition duration-300"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gray-300 transition duration-300"><Twitter size={20} /></a>
            <a href="#" className="hover:text-gray-300 transition duration-300"><Instagram size={20} /></a>
          </div> */}
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm">
          <p>© 2024 ARQVIZ Interactive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
