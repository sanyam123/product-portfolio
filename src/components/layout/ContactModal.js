import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const ContactModal = ({ isOpen, onClose }) => {
  const modalRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-blue-500 text-2xl" />,
      label: 'Email',
      value: 'sanyam.singhal21@gmail.com',
      link: 'mailto:sanyam.singhal21@gmail.com',
    },
    {
      icon: <FaPhone className="text-blue-500 text-2xl" />,
      label: 'Phone',
      value: '+91-8296538320',
      link: 'tel:+918296538320',
    },
    {
      icon: <FaLinkedin className="text-blue-500 text-2xl" />,
      label: 'LinkedIn',
      value: 'View Profile',
      link: 'https://www.linkedin.com/in/sanyam-singhal-909018136/',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            ref={modalRef}
            className={`bg-white rounded-xl shadow-2xl w-full border-t-4 border-blue-600 ${
              isMobile ? 'max-w-[90%] p-6' : 'max-w-md p-8'
            } relative`}
          >
            {/* Close button - improved for mobile */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`absolute -top-4 -right-4 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-10 ${
                isMobile ? 'w-10 h-10' : 'w-12 h-12'
              }`}
            >
              <IoClose size={isMobile ? 20 : 28} />
            </motion.button>
            
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 md:mb-8 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  whileHover={{ scale: 1.03 }}
                  href={item.link}
                  target={item.label === 'LinkedIn' ? "_blank" : undefined}
                  rel={item.label === 'LinkedIn' ? "noopener noreferrer" : undefined}
                  className={`flex items-center rounded-lg transition-all hover:bg-blue-50 border border-gray-100 hover:border-blue-200 hover:shadow-md active:bg-blue-100 ${
                    isMobile ? 'p-3' : 'p-4'
                  }`}
                >
                  <div className="mr-5 bg-blue-100 p-3 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      {item.label}
                    </div>
                    <div className={`font-bold text-gray-800 break-words ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}>
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-center text-gray-700 font-medium">
              If you're hiring, I'm listening. Let's connect!
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;