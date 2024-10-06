import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <footer className="bg-black text-white w-full mt-24 pt-12">
      {/* CTA Section */}
      {!isContactPage && (
        <div className="bg-black py-12 px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6">
              <span className="font-sans tracking-wide">Your <span className="font-serif italic font-bold">Vision</span>,</span> <span className="font-serif italic">Our <span className="font-bold">Expertise</span>:</span><br/>
              <span className="font-sans">A</span> <span className="font-serif italic">Masterpiece</span> <span className="font-sans">in the Making</span>
            </h2>
            <Link to="/contact" className="inline-block bg-white text-black px-6 py-3 rounded-sm hover:bg-gray-200 transition duration-300 text-base font-semibold">
              Let's talk
            </Link>
          </div>
        </div>
      )}

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
              <li><Link to="/work" className="hover:text-gray-300 transition duration-300">Work</Link></li>
              <li><Link to="/about" className="hover:text-gray-300 transition duration-300">About</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300 transition duration-300">Contact</Link></li>
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-gray-300 transition duration-300"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gray-300 transition duration-300"><Twitter size={20} /></a>
            <a href="#" className="hover:text-gray-300 transition duration-300"><Instagram size={20} /></a>
          </div>
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
