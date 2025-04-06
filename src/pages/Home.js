import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

import Navbar from '../components/layout/Navbar';
import ContactModal from '../components/layout/ContactModal';
import Chatbot from '../components/layout/Chatbot';
import { useModal } from '../context/ModalContext';

const Home = () => {
  const { isContactModalOpen, openContactModal, closeContactModal } = useModal();
  
  // Simple animation states
  const [showTitle, setShowTitle] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showWordSwap, setShowWordSwap] = useState(false);
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

  // Start photo animation immediately, trigger title animation after delay
  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 800);
    
    return () => clearTimeout(titleTimer);
  }, []);

  // Handler for opening resume in new tab
  const openResume = () => {
    window.open('/assets/SanyamSinghal-PM-Resume.pdf', '_blank');
  };

  return (
    <>
      <Navbar openContactModal={openContactModal} />
      
      <main className={`container mx-auto px-4 pt-24 md:pt-32 lg:pt-36 ${isMobile ? 'pb-24' : 'pb-16'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-12">
            {/* Photo fades in from left - moved more to the right with increased gap */}
            <motion.div 
              className="w-full md:w-2/5 lg:w-1/3 flex justify-center md:justify-end"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden 
                          shadow-lg border-4 border-white hover:shadow-xl transition-shadow duration-300">
                <img
                  src="/assets/profile-photo.jpg"
                  alt="Sanyam Singhal"
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
            
            {/* Content */}
            <div className="w-full md:w-3/5 lg:w-2/3 text-center md:text-left">
              {showTitle ? (
                <div>
                  {/* Use a two-line approach with separate h1 elements to prevent layout shift */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 text-gray-900">
                    {!showWordSwap ? (
                      <TypeAnimation
                        sequence={[
                          "Hello, I'm Sanyam,",
                          500,
                          () => {
                            // After first line is typed, start showing the second line
                            setTimeout(() => setShowWordSwap(true), 500);
                            
                            // After a longer delay, show the rest of the content
                            setTimeout(() => setShowContent(true), 1500);
                          },
                        ]}
                        speed={50}
                        cursor={showWordSwap ? false : true}
                      />
                    ) : (
                      "Hello, I'm Sanyam,"
                    )}
                  </h1>
                  
                  {/* Second line in a separate element with fixed minimum height */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 min-h-[3.5rem]">
                    {showWordSwap && (
                      <span className="inline-block">
                        a{' '}
                        <TypeAnimation
                          sequence={[
                            'Product Manager!',
                            1000,
                            '',
                            300,
                            'Problem Solver!',
                            1000,
                            '',
                            300,
                            'Strategic Thinker!',
                            1000,
                            '',
                            300,
                            'Product Manager!',
                            1000,
                          ]}
                          speed={50}
                          repeat={0}
                          cursor={true}
                          wrapper="span"
                          className="inline-block min-w-[12rem]" // Ensure minimum width to prevent layout shift
                        />
                      </span>
                    )}
                  </h1>
                  
                  {/* Subtitle only appears after title is typed - with smoother fade-in */}
                  {showContent && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="text-lg text-gray-700 mb-8"
                    >
                      I figure out what's worth building, bring clarity to chaos, and ship products that actually work—making users quietly think, "this just makes sense."
                    </motion.p>
                  )}
                  
                  {/* CTAs moved inside this div to align with title */}
                  {showContent && (
                    <motion.div 
                      className="flex flex-wrap gap-4 justify-center md:justify-start mt-4 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    >
                      <button 
                        onClick={openResume} 
                        className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
                      >
                        Open Resume
                      </button>
                      <Link to="/projects" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-colors">
                        Explore Projects
                      </Link>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="h-[180px]"></div> // Placeholder to maintain layout
              )}
            </div>
          </div>
          
          {/* Status Banner with smoother fade-in */}
          {showContent && (
            <motion.div 
              className="mt-16 pt-6 border-t border-gray-200 text-center max-w-5xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            >
              <p className="text-gray-700">
                Currently exploring APM/PM roles where I can build impactful products and grow fast.
                If that sounds like your team, <span 
                  className="text-blue-600 font-medium cursor-pointer underline"
                  onClick={openContactModal}
                >let's talk!</span>
              </p>
            </motion.div>
          )}
        </div>
      </main>
      
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <Chatbot openContactModal={openContactModal} />
    </>
  );
};

export default Home;