import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Chatbot = ({ openContactModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! I'm Sanyam's virtual assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
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

  // Auto-scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle clicking outside - mobile only
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        const chatbotButton = document.getElementById('chatbot-toggle-button');
        if (chatbotButton && !chatbotButton.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isMobile]);

  // Prevent body scrolling when chatbot is open on mobile only
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isMobile]);

  // Sample responses
  const sampleResponses = {
    'experience': "Sanyam has experience in product management across various domains including fintech, e-commerce, and SaaS platforms. Would you like to know more about a specific role?",
    'projects': "Sanyam has worked on several key projects including a financial analytics dashboard, an e-commerce recommendation engine, and a SaaS onboarding flow optimization. Would you like details about any of these?",
    'skills': "Sanyam's key skills include product strategy, user research, data analysis, roadmap planning, and cross-functional team leadership. He's also proficient in various product tools like Figma, Jira, and analytics platforms.",
    'contact': "You can contact Sanyam directly via email, phone, or LinkedIn. Would you like me to share his contact details?",
    'background': "Sanyam has a background in Computer Science with a focus on user experience and product development. He's passionate about building user-centered products that solve real problems.",
    'education': "Sanyam holds a Bachelor's degree in Computer Science and has completed several product management certifications including courses from Product School and Reforge.",
    'default': "I don't have specific information about that, but I'd be happy to connect you with Sanyam directly. Would you like his contact information?",
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate thinking with a short delay
    setTimeout(() => {
      // Generate response based on keywords
      let botResponse;
      const input = inputValue.toLowerCase();
      
      if (input.includes('experience') || input.includes('work')) {
        botResponse = sampleResponses.experience;
      } else if (input.includes('project')) {
        botResponse = sampleResponses.projects;
      } else if (input.includes('skill') || input.includes('know') || input.includes('can')) {
        botResponse = sampleResponses.skills;
      } else if (input.includes('contact') || input.includes('email') || input.includes('phone') || input.includes('reach')) {
        botResponse = sampleResponses.contact;
        // Offer to open contact modal
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              sender: 'bot',
              text: "Would you like me to show you Sanyam's contact details?",
              timestamp: new Date(),
              actions: [
                {
                  label: "Yes, show contact info",
                  action: () => {
                    openContactModal();
                    setIsOpen(false); // Close chatbot when opening contact modal
                  }
                },
                {
                  label: "No thanks",
                  action: () => {
                    setMessages((prev) => [
                      ...prev,
                      {
                        sender: 'bot',
                        text: "No problem! Let me know if you have any other questions.",
                        timestamp: new Date(),
                      },
                    ]);
                  }
                }
              ]
            },
          ]);
        }, 1000);
      } else if (input.includes('background') || input.includes('about')) {
        botResponse = sampleResponses.background;
      } else if (input.includes('education') || input.includes('degree') || input.includes('study')) {
        botResponse = sampleResponses.education;
      } else {
        botResponse = sampleResponses.default;
      }

      // Add bot response
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          timestamp: new Date(),
        },
      ]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot toggle button - improved only for mobile */}
      <motion.button
        id="chatbot-toggle-button"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 bg-blue-800 hover:bg-blue-700 transition-colors z-40 ${
          isMobile ? "w-12 h-12" : "w-14 h-14"
        } rounded-full flex items-center justify-center shadow-lg`}
      >
        {isOpen ? (
          <FaTimes className="text-white text-xl" />
        ) : (
          <FaRobot className="text-white text-xl" />
        )}
      </motion.button>

      {/* Chatbot window - mobile specific styles applied conditionally */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            ref={chatContainerRef}
            className={`fixed ${
              isMobile 
                ? "inset-0 rounded-none" 
                : "bottom-24 right-6 w-full max-w-sm h-96 rounded-lg"
            } bg-white shadow-xl overflow-hidden flex flex-col z-40`}
          >
            {/* Chat header - close button only on mobile */}
            <div className="bg-blue-800 p-4 text-white flex items-center justify-between">
              <div>
                <h3 className="font-medium">Chat with Sanyam's Assistant</h3>
                <p className="text-xs text-blue-100">
                  Ask me anything about Sanyam's experience and projects
                </p>
              </div>
              {isMobile && (
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="Close chat"
                >
                  <FaTimes className="text-white" />
                </button>
              )}
            </div>

            {/* Messages area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.actions && (
                      <div className="flex flex-col space-y-2 mt-2">
                        {message.actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={action.action}
                            className="text-xs bg-white text-blue-600 py-1 px-2 rounded border border-blue-200 hover:bg-blue-50 transition-colors text-left"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area - improved touch targets only on mobile */}
            <div className="border-t p-2 flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-grow border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`bg-blue-600 text-white px-4 py-2 rounded-r-lg ${
                  !inputValue.trim()
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-700'
                }`}
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;