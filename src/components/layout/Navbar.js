import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ openContactModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    openContactModal();
  };

  // Handler for resume link
  const handleResumeClick = (e) => {
    e.preventDefault();
    // Open resume PDF in a new tab
    window.open('/assets/resume.pdf', '_blank');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About Me', path: '/about' },
    { name: 'Resume', path: '#', onClick: handleResumeClick },
    { name: 'Contact', path: '#', onClick: handleContactClick },
  ];

  return (
    <header
      className={`w-full py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-gray-100'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl md:text-2xl cursor-pointer text-blue-800">
          Sanyam Singhal
        </Link>
        
        {/* Contact button for mobile - only show contact in top bar */}
        <div className="md:hidden">
          <button
            onClick={handleContactClick}
            className="p-2 text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            Contact
          </button>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.onClick ? (
                <button
                  className={`font-medium transition-colors duration-300 hover:text-blue-600 ${
                    link.name === 'Resume' || link.name === 'Contact' ? 'text-gray-700' : ''
                  }`}
                  onClick={link.onClick}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  to={link.path}
                  className={`font-medium transition-colors duration-300 hover:text-blue-600 ${
                    location.pathname === link.path ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              )}
              {location.pathname === link.path && link.path !== '#' && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 top-full h-0.5 w-full bg-blue-600"
                />
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;