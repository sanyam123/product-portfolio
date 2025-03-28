import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import ContactModal from '../components/layout/ContactModal';
import Chatbot from '../components/layout/Chatbot';
import { useModal } from '../context/ModalContext';
import { FaExternalLinkAlt } from 'react-icons/fa';

// Work experience data - updated to combine Picarro roles
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
        details: 'Led product development for a real-time gas leak detection platform—translating user research into wireframes and PRDs, collaborating cross-functionally to align priorities, and supporting enterprise onboarding for a successful rollout, generating $5M in revenue.'
      },
      {
        id: 'p2',
        title: 'Software Engineer',
        duration: 'March 2022 - October 2023',
        details: 'Developed front-end application in React for Picarro\'s fenceline air monitoring platform—driving adoption across 5 enterprise clients, enhancing usability, and contributing to $50M+ in ARR.'
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
    details: 'Led automation of key financial workflows at UBS, saving 400+ man-hours monthly and enabling faster, data-driven decisions across business teams.'
  },
  {
    id: 4,
    company: 'GE Transportation',
    description: 'Industry leader in locomotive engineering and transportation solutions',
    position: 'Product Analytics Intern',
    duration: 'January 2020 - July 2020',
    logo: '/assets/logos/ge.png',
    details: 'Designed and built Power BI dashboards that improved locomotive performance monitoring and boosted servicing efficiency by 20%.'
  },
  {
    id: 5,
    company: 'Stanley Black & Decker',
    description: 'World\'s largest tool company, powering innovation across homes and industries.',
    position: 'Augmented Reality Development Intern',
    duration: 'May 2019 - July 2019',
    logo: '/assets/logos/stanley.png',
    details: 'Developed an AR-based Android app in Unity 3D to assist 10K+ tool users in remote areas — cutting support dependency by ~25% and enabling faster, on-site fixes.'
  },
];

// Education data
const education = [
  {
    id: 1,
    institution: 'Manipal Institute of Technology',
    degree: 'Bachelor of Technology in Computer Science',
    duration: '2016 - 2020',
    logo: '/assets/logos/university.png',
    details: [
      'CGPA: 8.5/10',
      'Relevant coursework: Data Structures, Algorithms, Software Engineering',
    ],
  },
];

// Certificates and achievements data
const certificates = [
  {
    id: 1,
    title: 'Product Management Fellowship',
    issuer: 'NextLeap',
    logo: '/assets/logos/nextleap.jpg',
    details: 'Graduated as a top fellow ranking among the top 1% of the batch',
    url: 'https://example.com/certificate/nextleap'
  },
  {
    id: 2,
    title: 'Product Management Professional',
    issuer: 'Product School',
    logo: '/assets/logos/pmschool.png',
    details: 'Completed comprehensive product management curriculum covering strategy, execution, and analytics',
    url: 'https://example.com/certificate/productschool'
  },
  {
    id: 3,
    title: 'AI Product Development',
    issuer: 'Coursera',
    logo: '/assets/logos/hackerrank.jpg ',
    details: 'Specialized in artificial intelligence product development methodologies and frameworks',
    url: 'https://example.com/certificate/coursera'
  },
  {
    id: 4,
    title: 'AI Product Development',
    issuer: 'Coursera',
    logo: '/assets/logos/udemy.png ',
    details: 'Specialized in artificial intelligence product development methodologies and frameworks',
    url: 'https://example.com/certificate/coursera'
  }
];

const About = () => {
  const { isContactModalOpen, openContactModal, closeContactModal } = useModal();
  const [activeTab, setActiveTab] = useState('experience');

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
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border border-gray-200 rounded-full p-1 bg-white shadow-sm">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'experience'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Work Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'education'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
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
                    {/* Timeline connector */}
                    {index < workExperience.length - 1 && (
                      <div className="absolute left-10 top-20 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full z-0"></div>
                    )}
                    
                    <div className="relative z-10 flex">
                      {/* Company Logo */}
                      <div className="shrink-0 mr-6">
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
                        
                        {/* Creative timeline elements */}
                        {index < workExperience.length - 1 && (
                          <div className="mt-4 ml-9 h-8 w-8 rounded-full bg-blue-500 border-4 border-white shadow-md"></div>
                        )}
                      </div>
                      
                      {/* Job Details */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1 hover:shadow-md transition-shadow duration-300">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <div>
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
                                  <h4 className="text-lg font-semibold text-blue-700">{position.title}</h4>
                                  <div className="md:text-right mt-1 md:mt-0">
                                    <div className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                      {position.duration}
                                    </div>
                                  </div>
                                </div>
                                <p className="text-gray-700 mt-1">{position.details}</p>
                                
                                {/* Career progression indicator between positions */}
                                {posIndex < job.positions.length - 1 && (
                                  <div className="flex justify-center my-2">
                                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          // For single position jobs
                          <div>
                            <h4 className="text-lg font-semibold text-blue-700 mb-2">{job.position}</h4>
                            <p className="text-gray-700">{job.details}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            // Education and Certificates Content - keeping this part unchanged
            <div>
              {/* Education Section */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </span>
                  Education
                </h2>
                
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="mb-8"
                  >
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex">
                        {/* Institution Logo */}
                        <div className="shrink-0 mr-6">
                          <div className="w-20 h-20 rounded-lg bg-white shadow-md flex items-center justify-center overflow-hidden">
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
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{edu.institution}</h3>
                              <h4 className="text-lg font-semibold text-blue-700 mb-3">{edu.degree}</h4>
                            </div>
                            <div className="text-right mt-2 md:mt-0">
                              <div className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                                {edu.duration}
                              </div>
                            </div>
                          </div>
                          
                          <ul className="space-y-2 text-gray-700">
                            {edu.details.map((detail, i) => (
                              <li key={i} className="flex items-start">
                                <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              
              {/* Certificates and Achievements Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  Certificates & Achievements
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificates.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                        <div className="flex mb-4">
                          {/* Certificate Issuer Logo */}
                          <div className="shrink-0 mr-4">
                            <div className="w-14 h-14 rounded-lg bg-white shadow-sm flex items-center justify-center overflow-hidden">
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
                          </div>
                          
                          {/* Certificate Title and Issuer */}
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight">{cert.title}</h3>
                            <p className="text-sm text-gray-600">{cert.issuer}</p>
                          </div>
                        </div>
                        
                        {/* Certificate Details */}
                        <p className="text-gray-700 text-sm mb-4 flex-grow">{cert.details}</p>
                        
                        {/* View Certificate Button */}
                        <div className="mt-auto">
                          <a 
                            href={cert.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
                          >
                            View Certificate <FaExternalLinkAlt className="ml-2 text-xs" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <Chatbot openContactModal={openContactModal} />
    </>
  );
};

export default About;