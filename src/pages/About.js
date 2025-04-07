import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import ContactModal from '../components/layout/ContactModal';
import Chatbot from '../components/layout/Chatbot';
import { useModal } from '../context/ModalContext';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Footer from '../components/layout/Footer';

// Function to format job details with highlighted parts
const formatJobDetails = (details, highlights) => {
  if (!highlights || highlights.length === 0) return details;
  
  let formattedText = details;
  highlights.forEach(term => {
    formattedText = formattedText.replace(
      term, 
      `<span class="font-bold text-blue-600 px-1 bg-blue-50 rounded">${term}</span>`
    );
  });
  
  return formattedText;
};

// Work experience data - updated with highlighted terms
const workExperience = [
  {
    id: 1,
    company: 'Picarro, Inc',
    description: 'Leader in clean energy tech, specializing in gas analytics and air monitoring',
    logo: '/assets/logos/picarro.png',
    positions: [
      {
        id: 'p1',
        title: 'Associate Product Manager',
        duration: 'October 2023 - Present',
        details: 'Led product development for a real-time gas leak detection platform—translating user research into wireframes and PRDs, collaborating cross-functionally to align priorities, and supporting enterprise onboarding for a successful rollout, generating $5M in revenue.',
        highlights: ['$5M']
      },
      {
        id: 'p2',
        title: 'Software Engineer',
        duration: 'March 2022 - October 2023',
        details: 'Developed front-end application in React for Picarro\'s fenceline air monitoring platform—driving adoption across 5 enterprise clients, enhancing usability, and contributing to $50M+ in ARR.',
        highlights: ['$50M+', '5 enterprise clients']
      }
    ]
  },
  {
    id: 3,
    company: 'Union Bank of Switzerland',
    description: 'Global investment bank and wealth management firm',
    position: 'Automation Engineer',
    duration: 'August 2020 - March 2022',
    logo: '/assets/logos/ubs.png',
    details: 'Led automation of key financial workflows at UBS, saving 400+ man-hours monthly and enabling faster, data-driven decisions across business teams.',
    highlights: ['400+ man-hours']
  },
  {
    id: 4,
    company: 'GE Transportation',
    description: 'Industry leader in locomotive engineering and transportation solutions',
    position: 'Product Analytics Intern',
    duration: 'January 2020 - July 2020',
    logo: '/assets/logos/ge.png',
    details: 'Designed and built Power BI dashboards that improved locomotive performance monitoring and boosted servicing efficiency by 20%.',
    highlights: ['20%']
  },
  {
    id: 5,
    company: 'Stanley Black & Decker',
    description: 'World\'s largest tool company, powering innovation across homes and industries.',
    position: 'Augmented Reality Development Intern',
    duration: 'May 2019 - July 2019',
    logo: '/assets/logos/stanley.png',
    details: 'Developed an AR-based Android app in Unity 3D to assist 10K+ tool users in remote areas — cutting support dependency by ~25% and enabling faster, on-site fixes.',
    highlights: ['10K+', '~25%']
  },
];

// Education data
const education = [
  {
    id: 1,
    institution: 'NextLeap',
    degree: 'Product Management Fellowship',
    duration: 'October 2024 - January 2025',
    logo: '/assets/logos/nextleap.jpg',
  },
  {
    id: 2,
    institution: 'Manipal Institute of Technology',
    degree: 'Bachelor of Technology in Computer Science',
    duration: 'August 2016 - August 2020',
    logo: '/assets/logos/university.png',
  },
];

// Certificates and achievements data
const certificates = [
  {
    id: 1,
    title: '3rd Rank - Product Strategy Case Competition',
    issuer: 'PM School',
    logo: '/assets/logos/pmschool.png',
    url: 'https://drive.google.com/file/d/1oL1FEE4GVAXD2rM3UN1OoBeH3yWdp2aU/view'
  },
  {
    id: 2,
    title: 'Analytics for PMs',
    issuer: 'PM School',
    logo: '/assets/logos/pmschool.png ',
    url: 'https://drive.google.com/file/d/16wlkDmJQzmZRFpNHAo0ccn9NVCK2psTX/view'
  },
  {
    id: 3,
    title: 'SQL (Basic)',
    issuer: 'HackerRank',
    logo: '/assets/logos/hackerrank.jpg ',
    url: 'https://www.hackerrank.com/certificates/iframe/619d572b81b9'
  },
  {
    id: 4,
    title: 'SQL (Intermediate)',
    issuer: 'HackerRank',
    logo: '/assets/logos/hackerrank.jpg ',
    url: 'https://www.hackerrank.com/certificates/iframe/c70d1a9e8822'
  },
  
  {
    id: 5,
    title: 'Microsoft Power BI for Business Intelligence',
    issuer: 'Udemy',
    logo: '/assets/logos/udemy.png',
    url: 'https://www.udemy.com/certificate/UC-7a0ce84f-090a-4436-bbd1-e59070e6b3a8/'
  },
  {
    id: 6,
    title: 'Microsoft Excel : Data Analysis with Excel Pivot Tables',
    issuer: 'Udemy',
    logo: '/assets/logos/udemy.png',
    url: 'https://www.udemy.com/certificate/UC-f78858f1-89a2-43ef-97d9-e2f978523c76/'
  }
];

const About = () => {
  const { isContactModalOpen, openContactModal, closeContactModal } = useModal();
  const [activeTab, setActiveTab] = useState('experience');
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

  return (
    <>
      <Navbar openContactModal={openContactModal} />
      
      <main className="container mx-auto px-4 pt-20 md:pt-24 pb-16">
        {/* Page Heading */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            About Me
          </h1>
        </div>
        
        {/* Tabs - mobile improvements */}
        <div className="flex justify-center mb-10">
          <div className={`inline-flex border border-gray-200 rounded-full p-1 bg-white shadow-sm ${
            isMobile ? 'w-full justify-center' : ''
          }`}>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'experience'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isMobile ? 'flex-1' : ''}`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'education'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isMobile ? 'flex-1' : ''}`}
            >
              Education
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'experience' ? (
            // Work Experience Content
            <div>
              {/* Timeline with creative connecting elements */}
              <div className="relative">
                {workExperience.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="mb-12 relative"
                  >
                    {/* Timeline connector - don't show on mobile */}
                    {index < workExperience.length - 1 && !isMobile && (
                      <div className="absolute left-10 top-20 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full z-0"></div>
                    )}
                    
                    <div className={`relative z-10 ${isMobile ? 'flex flex-col items-center' : 'flex'}`}>
                      {/* Company Logo */}
                      <div className={`shrink-0 ${isMobile ? 'mb-4' : 'mr-6'}`}>
                        <div className="w-20 h-20 rounded-lg bg-white shadow-md border border-gray-100 flex items-center justify-center overflow-hidden">
                          <img 
                            src={job.logo} 
                            alt={`${job.company} logo`} 
                            className="max-w-full max-h-full object-contain p-2"
                            onError={(e) => {
                              e.target.src = '/assets/logos/placeholder.png';
                              e.target.onerror = null;
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Job Details */}
                      <motion.div 
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 transition-shadow duration-300"
                        whileHover={{ 
                          y: -5,
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        }}
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <div className={`${isMobile ? 'bg-gray-50 rounded-md px-3 py-2 -mx-1 mb-3 w-full' : ''}`}>
                            <h3 className="text-xl font-bold text-gray-900">{job.company}</h3>
                            <p className="text-sm text-gray-500 italic mb-3">{job.description}</p>
                          </div>
                          {/* Only show duration here if it's not a multi-position job */}
                          {!job.positions && (
                            <div className="text-right mt-2 md:mt-0">
                              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                {job.duration}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* For companies with multiple positions (career progression) */}
                        {job.positions ? (
                          <div className="space-y-4">
                            {job.positions.map((position, posIndex) => (
                              <div 
                                key={position.id} 
                                className={`${posIndex !== 0 ? 'pt-4 border-t border-gray-100' : ''}`}
                              >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1">
                                  <h4 className={`text-lg font-semibold text-blue-700 ${isMobile ? 'mb-2' : ''}`}>{position.title}</h4>
                                  <div className={`${isMobile ? 'mb-2' : ''} md:text-right mt-1 md:mt-0`}>
                                    <div className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                      {position.duration}
                                    </div>
                                  </div>
                                </div>
                                <p 
                                  className="text-gray-700 mt-1" 
                                  dangerouslySetInnerHTML={{
                                    __html: formatJobDetails(position.details, position.highlights)
                                  }} 
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          // For single position jobs
                          <div>
                            <h4 className={`text-lg font-semibold text-blue-700 ${isMobile ? 'mb-2' : ''}`}>{job.position}</h4>
                            <p 
                              className="text-gray-700" 
                              dangerouslySetInnerHTML={{
                                __html: formatJobDetails(job.details, job.highlights)
                              }} 
                            />
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            // Education and Certificates Content
            <div>
              {/* Education Section */}
<div className="mb-12">
  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
    Education
  </h2>
  
  {education.map((edu, index) => (
    <motion.div
      key={edu.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="mb-5"
    >
      <motion.div 
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-shadow duration-300"
        whileHover={{ 
          y: -5,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        }}
      >
        <div className={`${isMobile ? 'flex flex-col' : 'flex'}`}>
          {/* Institution Logo */}
          <div className={`shrink-0 ${isMobile ? 'flex justify-center mb-3' : 'mr-5'}`}>
            <div className="w-16 h-16 rounded-lg bg-white shadow-md flex items-center justify-center overflow-hidden">
              <img 
                src={edu.logo} 
                alt={`${edu.institution} logo`} 
                className="max-w-full max-h-full object-contain p-2"
                onError={(e) => {
                  e.target.src = '/assets/logos/placeholder.png';
                  e.target.onerror = null;
                }}
              />
            </div>
          </div>
          
          {/* Education Details */}
          <div className="flex-1">
            <div className={`${isMobile ? 'flex flex-col text-center' : 'flex flex-col md:flex-row md:justify-between md:items-start'} mb-2`}>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{edu.institution}</h3>
                <h4 className="text-base font-semibold text-blue-700 mb-2">{edu.degree}</h4>
              </div>
              <div className={`${isMobile ? 'mt-1 mb-2' : 'text-right mt-1 md:mt-0'}`}>
                <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  {edu.duration}
                </div>
              </div>
            </div>
            
            {/* Single detail with icon */}
            <div className="text-gray-700">
              {edu.id === 1 ? (
                <div className={`${isMobile ? 'flex flex-col items-center' : 'flex items-start justify-between'}`}>
                  <div className={`flex items-start ${isMobile ? 'mb-2 text-center' : ''}`}>
                    
                    <span className="text-sm">Recognised as a <span class="font-bold text-blue-600 px-1 bg-blue-50 rounded">Top Fellow</span> (Top 1% of the Graduating Cohort)</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-2 text-amber-600 flex-shrink-0 mt-0.5">
                      <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <a 
                    href="https://drive.google.com/file/d/1o9nNBLCE4M_UONa8OaiMujrkwcfgblY4/view" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-shrink-0 p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                    aria-label="View certificate"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ) : (
                <div className={`flex items-start ${isMobile ? 'justify-center text-center' : ''}`}>
                 
                  <span className="text-sm">CGPA: <strong>8.5/10</strong>, Scored a perfect <span class="font-bold text-blue-600 px-1 bg-blue-50 rounded">10 GPA</span> in the final semester</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-2 text-amber-600 flex-shrink-0 mt-0.5">
                    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  ))}
</div>

{/* Certificates and Achievements Section */}
<div>
  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
    Certificates & Achievements
  </h2>
  
  <div className="space-y-3">
  {certificates.map((cert, index) => (
    <motion.div
      key={cert.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ 
        y: -2,
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
    >
      <div className={`bg-white rounded-lg border ${cert.id === 1 ? 'border-amber-200' : 'border-gray-200'} p-4 flex justify-between items-center ${isMobile ? 'flex-wrap' : ''}`}>
        <div className={`flex items-center ${isMobile ? 'flex-1 min-w-0 mb-2' : ''}`}>
          <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} shrink-0 rounded flex items-center justify-center overflow-hidden mr-4 bg-white border border-gray-100 shadow-sm`}>
            <img 
              src={cert.logo} 
              alt={`${cert.issuer} logo`} 
              className="max-w-full max-h-full object-contain p-1"
              onError={(e) => {
                e.target.src = '/assets/logos/placeholder.png';
                e.target.onerror = null;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap">
              <h3 className={`font-bold text-gray-900 ${isMobile ? 'text-sm truncate' : ''}`}>{cert.title}</h3>
              {cert.id === 1 && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-2 text-amber-600">
                    <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600">{cert.issuer}</p>
          </div>
        </div>
        <a 
          href={cert.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors ${
            isMobile ? 'ml-auto' : ''
          }`}
          aria-label={`View ${cert.title} certificate`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </motion.div>
  ))}
</div>
</div>
            </div>
          )}
        </div>
      </main>
      <Footer/>
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <Chatbot openContactModal={openContactModal} />
    </>
  );
};

export default About;