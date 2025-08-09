import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

interface ErrorAlertProps {
  error: string;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
            <motion.button
              onClick={onClose}
              className="text-red-400 hover:text-red-600 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorAlert;