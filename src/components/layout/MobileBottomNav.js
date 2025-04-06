import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaLightbulb, FaUserAlt, FaFileAlt } from 'react-icons/fa';

const MobileBottomNav = () => {
  const location = useLocation();
  
  // Handler for opening resume in new tab
  const openResume = () => {
    window.open('/assets/resume.pdf', '_blank');
  };

  // Navigation items
  const navItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: <FaHome size={20} />,
      action: null // Regular link
    },
    { 
      name: 'Projects', 
      path: '/projects', 
      icon: <FaLightbulb size={20} />,
      action: null // Regular link
    },
    { 
      name: 'About', 
      path: '/about', 
      icon: <FaUserAlt size={20} />,
      action: null // Regular link
    },
    { 
      name: 'Resume', 
      path: '#', 
      icon: <FaFileAlt size={20} />,
      action: openResume // Custom action
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <div key={item.name} className="flex-1">
            {item.action ? (
              <button
                onClick={item.action}
                className="w-full h-full flex flex-col items-center justify-center space-y-1 focus:outline-none"
              >
                <div className={`${location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs ${location.pathname === item.path ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  {item.name}
                </span>
              </button>
            ) : (
              <Link
                to={item.path}
                className="w-full h-full flex flex-col items-center justify-center space-y-1"
              >
                <div className={`${location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs ${location.pathname === item.path ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  {item.name}
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;