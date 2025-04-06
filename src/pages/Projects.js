import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import ContactModal from '../components/layout/ContactModal';
import Chatbot from '../components/layout/Chatbot';
import Footer from '../components/layout/Footer';
import { useModal } from '../context/ModalContext';

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: 'YouTube Smart Insights Web-App',
    description: 'Dating Made Effortless: How My Solution Transforms Your Date Planning Experience',
    impact: 'Unlocking $10M in potential annual revenue while boosting user retention by 5%',
    image: '/assets/projects/youtube.png',
    category: 'MVP',
    // Flexible CTA configuration
    cta: {
      primary: {
        text: 'View MVP',
        url: 'https://youtube-frontend-six.vercel.app/', // External website link
        isPdf: false
      },
      secondary: {
        text: 'View Slides',
        url: '/assets/projects/YouTube Smart Insights.pdf',
        isPdf: true
      }
    }
  },
  {
    id: 2,
    title: 'District by Zomato',
    description: 'Dating Made Effortless: How My Solution Transforms Your Date Planning Experience',
    impact: 'Unlocking $10M in potential annual revenue while boosting user retention by 5%',
    image: '/assets/projects/d1.avif',
    category: 'Case Study',
    // Single CTA configuration
    cta: {
      primary: {
        text: 'View Case Study',
        url: '/assets/projects/Myntra-Rentals.pdf',
        isPdf: true
      },
      secondary: {
        text: 'View Wireframes',
        url: 'https://www.figma.com/design/t97WhbWKQgaVkLAaYRatVT/Myntra-Rentals?node-id=0-1&t=bOxC3IDEZDPmADZv-1',
        isPdf: false 
      }
    }
  },
  {
    id: 3,
    title: 'Myntra Rentals - Case Study',
    description: 'Dating Made Effortless: How My Solution Transforms Your Date Planning Experience',
    impact: 'Unlocking $10M in potential annual revenue while boosting user retention by 5%',
    image: '/assets/projects/myntra-1.avif',
    category: 'AI Agent',
    // Flexible CTA configuration
    cta: {
      primary: {
        text: 'View Demo',
        url: 'https://yourwebsite.com/uno-ai-demo', // External website link
        isPdf: false
      },
      secondary: {
        text: 'View Slides',
        url: '/assets/projects/UNO-Slides.pdf',
        isPdf: true
      }
    }
  },
  {
    id: 4,
    title: 'Myntra Rentals - PRD',
    description: 'Dating Made Effortless: How My Solution Transforms Your Date Planning Experience',
    impact: 'Unlocking $10M in potential annual revenue while boosting user retention by 5%',
    image: '/assets/projects/myntra-1.avif',
    category: 'AI Agent',
    // Flexible CTA configuration
    cta: {
      primary: {
        text: 'View Demo',
        url: 'https://yourwebsite.com/uno-ai-demo', // External website link
        isPdf: false
      },
      secondary: {
        text: 'View Slides',
        url: '/assets/projects/UNO-Slides.pdf',
        isPdf: true
      }
    }
  },
  // {
  //   id: 5,
  //   title: 'UNO - AI Personal Assistant',
  //   description: 'Dating Made Effortless: How My Solution Transforms Your Date Planning Experience',
  //   impact: 'Unlocking $10M in potential annual revenue while boosting user retention by 5%',
  //   image: '/assets/projects/myntra-3.png',
  //   category: 'AI Agent',
  //   // Flexible CTA configuration
  //   cta: {
  //     primary: {
  //       text: 'View Demo',
  //       url: 'https://yourwebsite.com/uno-ai-demo', // External website link
  //       isPdf: false
  //     },
  //     secondary: {
  //       text: 'View Slides',
  //       url: '/assets/projects/UNO-Slides.pdf',
  //       isPdf: true
  //     }
  //   }
  // },
];

// Filter categories
const categories = ['All', 'Case Study', 'Product Teardown', 'PRD', "MVP"];

const Projects = () => {
  const { isContactModalOpen, openContactModal, closeContactModal } = useModal();
  const [activeFilter, setActiveFilter] = useState('All');
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

  // Filter projects based on selected category
  const filteredProjects = activeFilter === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);

  // Handle CTA click - works for both PDFs and external links
  const handleCtaClick = (ctaConfig) => {
    if (ctaConfig.isPdf) {
      // Open PDF in new tab
      window.open(ctaConfig.url, '_blank');
    } else {
      // Navigate to external link in new tab
      window.open(ctaConfig.url, '_blank');
    }
  };

  return (
    <>
      <Navbar openContactModal={openContactModal} />
      
      <main className={`container mx-auto px-4 pt-20 md:pt-24 ${isMobile ? 'pb-24' : 'pb-16'}`}>
        {/* Page Heading */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Projects
          </h1>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Projects Grid - with smaller tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              {/* Project Image - reduced height */}
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover cursor-pointer"
                  onClick={() => handleCtaClick(project.cta.primary)}
                />
                
                {/* Category Badge - smaller size */}
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-600 bg-opacity-90 backdrop-blur-sm text-white text-xs px-2.5 py-0.5 rounded-full shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>
              
              {/* Project Details - reduced padding */}
              <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {project.description}
                </p>
                
                {/* CTAs Section - smaller buttons */}
                {project.cta.secondary ? (
                  <div className="flex gap-2">
                    {/* Secondary (less prominent) CTA */}
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      onClick={() => handleCtaClick(project.cta.secondary)}
                      className="w-1/2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-2 rounded-md text-sm transition-colors"
                    >
                      {project.cta.secondary.text}
                    </motion.button>
                    
                    {/* Primary (prominent) CTA */}
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                      onClick={() => handleCtaClick(project.cta.primary)}
                      className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-2 rounded-md text-sm transition-colors shadow-sm"
                    >
                      {project.cta.primary.text}
                    </motion.button>
                  </div>
                ) : (
                  /* Single CTA */
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={() => handleCtaClick(project.cta.primary)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-md text-sm transition-colors shadow-sm"
                  >
                    {project.cta.primary.text}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Show message if no projects match the filter */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">
              No projects found in this category. Please check back later!
            </p>
          </div>
        )}
      </main>
      
      {/* Footer - only show on desktop */}
      {!isMobile && <Footer />}
      
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <Chatbot openContactModal={openContactModal} />
    </>
  );
};

export default Projects;