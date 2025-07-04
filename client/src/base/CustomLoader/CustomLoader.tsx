import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomLoader: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const messageTimer = setTimeout(() => setShowMessage(true), 4000);
    const quoteTimer = setTimeout(() => setShowQuote(true), 10000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(quoteTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1e1e1e] text-white px-4">
      <motion.div
        className="relative w-24 h-24"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1.5,
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-700"
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            className="text-blue-500"
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="282.6"
            strokeDashoffset="75"
            animate={{
              strokeDashoffset: [75, 225, 75],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="mt-8 flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: showMessage ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-3 h-3 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      <motion.p
        className="mt-6 text-gray-300 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: showMessage ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        Hang tight, we're almost there...
      </motion.p>

      <motion.p
        className="mt-4 text-gray-400 text-center text-sm italic max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: showQuote ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        "Patience is bitter, but its fruit is sweet." — Aristotle
      </motion.p>
    </div>
  );
};

export default CustomLoader;
