import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomPopupProps {
  isOpen: boolean;
  title: string;
  description?: string;
  inputLabel?: string;
  onConfirm: (inputValue?: string) => void;
  onCancel: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
  isOpen,
  title,
  description,
  inputLabel,
  onConfirm,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState('');
  
  // Reset input value when modal closes
  useEffect(() => {
    if (!isOpen) {
      setInputValue('');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-card-bg rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            
            {description && (
              <p className="text-gray-400 mb-4">{description}</p>
            )}
            
            {inputLabel && (
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">{inputLabel}</label>
                <input
                  type="text"
                  className="input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                />
              </div>
            )}
            
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
                onClick={() => onConfirm(inputValue)}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomPopup;
