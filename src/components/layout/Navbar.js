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

  useEffect(() => {
    // Close mobile menu when route changes - mobile only logic
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleContactClick = (e) => {
    e.preventDefault();
    openContactModal();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About Me', path: '/about' },
    { name: 'Resume', path: '/resume' },
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
        
        {/* Mobile menu button - only shown on mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Desktop navigation - UNCHANGED */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.path === '#' ? (
                <button
                  className={`font-medium transition-colors duration-300 hover:text-blue-600 ${
                    false ? 'text-blue-600' : 'text-gray-700'
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
      
      {/* Mobile menu - ONLY SHOWN ON MOBILE */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 z-50"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                {link.path === '#' ? (
                  <button
                    className="font-medium py-3 px-3 block text-gray-700 hover:bg-gray-50 rounded-md transition-colors active:bg-gray-100"
                    onClick={(e) => {
                      if (link.onClick) link.onClick(e);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`font-medium py-3 px-3 block rounded-md hover:bg-gray-50 transition-colors active:bg-gray-100 ${
                      location.pathname === link.path ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;