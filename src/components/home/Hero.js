import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-6 md:py-0">
      {/* Profile Photo */}
      <div className="w-full md:w-1/3 flex justify-center md:justify-start">
        <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl">
          <img
            src="/assets/profile-photo.jpg"
            alt="Sanyam Singhal"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="w-full md:w-2/3 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-blue-700">
          Product Manager obsessed with the <span className="relative inline-block">'why'<span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform -translate-y-1"></span></span>, and relentless about the <span className="relative inline-block">'how'<span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform -translate-y-1"></span></span>.
        </h1>
        
        <p className="text-lg text-gray-700 mb-8 max-w-2xl">
          I build digital products that solve real problems. With experience in product strategy, 
          user research, and cross-functional leadership, I help teams deliver exceptional user experiences.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/projects" className="btn btn-primary">
              View My Projects
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/resume" className="btn btn-outline">
              Download Resume
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;