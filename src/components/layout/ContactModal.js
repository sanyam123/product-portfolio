import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const ContactModal = ({ isOpen, onClose }) => {
  const modalRef = useRef();

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

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative border-t-4 border-blue-600"
          >
            {/* Close button - positioned half outside */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-10"
            >
              <IoClose size={28} />
            </motion.button>
            
            <h2 className="text-3xl font-bold text-blue-600 mb-8 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            
            <div className="space-y-8">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  whileHover={{ scale: 1.03 }}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg transition-all hover:bg-blue-50 border border-gray-100 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="mr-5 bg-blue-100 p-3 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      {item.label}
                    </div>
                    <div className="text-base font-bold text-gray-800">
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-center text-gray-700 font-medium">
              If you’re hiring, I’m listening. Let’s connect!
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;