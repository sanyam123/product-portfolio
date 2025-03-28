import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';

const ProjectsButton = () => {
  return (
    <Link to="/projects" className="block h-full">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full h-full p-8 flex flex-col items-center justify-center bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 hover:shadow-md transition-all duration-300"
      >
        <div className="text-6xl text-blue-800 mb-4">
          <FaLightbulb />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          PROJECTS
        </h2>
        <p className="mt-2 text-gray-600 text-center">
          Discover the products and solutions I've built
        </p>
      </motion.div>
    </Link>
  );
};

export default ProjectsButton;