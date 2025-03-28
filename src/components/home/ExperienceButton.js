import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

const ExperienceButton = () => {
  return (
    <Link to="/about" className="block h-full">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full h-full p-8 flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-300"
      >
        <div className="text-6xl text-blue-800 mb-4">
          <FaBriefcase />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          EXPERIENCE
        </h2>
        <p className="mt-2 text-gray-600 text-center">
          Explore my professional journey and key accomplishments
        </p>
      </motion.div>
    </Link>
  );
};

export default ExperienceButton;