import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Handler for opening resume in a new tab
  const openResume = () => {
    window.open('/assets/SanyamSinghal-PM-Resume.pdf', '_blank');
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            <p>© {currentYear} Sanyam Singhal. All rights reserved.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link to="/projects" className="hover:text-blue-600 transition-colors">Projects</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
              <li>
                <button 
                  onClick={openResume} 
                  className="hover:text-blue-600 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer"
                >
                  Resume
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;