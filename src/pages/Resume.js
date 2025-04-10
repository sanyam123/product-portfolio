import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

import Navbar from '../components/layout/Navbar';
import ContactModal from '../components/layout/ContactModal';
import Chatbot from '../components/layout/Chatbot';
import { useModal } from '../context/ModalContext';
import Footer from '../components/layout/Footer';

const Resume = () => {
  const { isContactModalOpen, openContactModal, closeContactModal } = useModal();
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
  
  // PDF file URL - update this with your actual resume path
  const resumeUrl = `${window.location.origin}/assets/SanyamSinghal-PM-Resume.pdf`;

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'SanyamSinghal-PM-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar openContactModal={openContactModal} />
      
      <main className="container mx-auto px-4 pt-20 md:pt-24 pb-16">
        {/* Heading and button container with relative positioning */}
        <div className="max-w-5xl mx-auto relative mb-6">
          {/* Centered title */}
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Resume
          </h1>
          
          {/* Button positioned differently on mobile */}
          <div className={`${isMobile ? 'flex justify-center mt-4' : 'absolute right-0 top-0'}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadResume}
              className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm"
            >
              <FaDownload className="text-sm" /> Download
            </motion.button>
          </div>
        </div>
        
        {/* PDF viewer - improved for mobile */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            width="100%"
            height={isMobile ? "600px" : "800px"}
            className="w-full"
            title="Resume"
            frameBorder="0"
          />
        </div>
      </main>
      
      <Footer/>
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <Chatbot openContactModal={openContactModal} />
    </>
  );
};

export default Resume;