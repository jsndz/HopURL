import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ExternalLink } from "lucide-react";

interface ShortenedUrl {
  short_code: string;
  short_url: string;
  original_url: string;
}

interface ShortenedUrlCardProps {
  shortenedUrl: ShortenedUrl;
}

const ShortenedUrlCard: React.FC<ShortenedUrlCardProps> = ({
  shortenedUrl,
}) => {
  const [copied, setCopied] = useState(false);
  console.log(shortenedUrl);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl.short_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        >
          <Check className="w-8 h-8 text-green-600" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          URL Shortened Successfully!
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Original URL:
          </label>
          <div className="p-3 bg-gray-50 rounded-lg text-gray-600 text-sm break-all">
            {shortenedUrl.original_url}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Short URL:
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 p-3 bg-orange-50 rounded-lg border-2 border-orange-200">
              <a
                href={shortenedUrl.short_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 font-mono font-semibold hover:text-orange-800 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>{shortenedUrl.short_url}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <motion.button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="copied"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center space-x-1"
                  >
                    <Check className="w-4 h-4" />
                    <span className="hidden sm:inline">Copied!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center space-x-1"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShortenedUrlCard;
