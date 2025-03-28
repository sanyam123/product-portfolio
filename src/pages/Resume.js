import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

import Navbar from '../components/layout/Navbar';
import ContactModal from '../components/layout/ContactModal';
import Chatbot from '../components/layout/Chatbot';
import { useModal } from '../context/ModalContext';

const Resume = () => {
  const { isContactModalOpen, openContactModal, closeContactModal } = useModal();
  
  // PDF file URL - update this with your actual resume path
  const resumeUrl = `${window.location.origin}/assets/resume.pdf`;

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Sanyam_Singhal_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar openContactModal={openContactModal} />
      
      <main className="container mx-auto px-4 pt-20 md:pt-24 pb-16">
        {/* Heading and button container with relative positioning */}
        <div className="max-w-5xl mx-auto relative mb-10">
          {/* Centered title */}
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Resume
          </h1>
          
          {/* Button positioned to align with PDF viewer */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadResume}
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm absolute right-0 top-0"
          >
            <FaDownload className="text-sm" /> Download
          </motion.button>
        </div>
        
        {/* PDF viewer with same max-width to ensure alignment */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
          <iframe
            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            width="100%"
            height="800px"
            className="w-full"
            title="Resume"
            frameBorder="0"
          />
        </div>
      </main>
      
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <Chatbot openContactModal={openContactModal} />
    </>
  );
};

export default Resume;