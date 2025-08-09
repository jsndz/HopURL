import React, { useState } from "react";
import { motion } from "framer-motion";
import UrlForm from "../components/UrlForm";
import ShortenedUrlCard from "../components/ShortenedUrlCard";
import ErrorAlert from "../components/ErrorAlert";

const API_URL = import.meta.env.VITE_API;
interface ShortenedUrl {
  short_code: string;
  short_url: string;
  original_url: string;
}

const HomePage: React.FC = () => {
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrl | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlShorten = async (url: string) => {
    setIsLoading(true);
    setError("");
    setShortenedUrl(null);

    try {
      const response = await fetch(`${API_URL}/api/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ original_url: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      console.log(data);

      setShortenedUrl({
        short_code: data.data.short_code,
        short_url: data.data.short_url,
        original_url: url,
      });
    } catch (err) {
      setError("Failed to shorten URL. Please check your URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Shorten Your URLs
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Transform long, unwieldy URLs into clean, shareable links. Fast,
          reliable, and completely free.
        </motion.p>
      </div>

      <UrlForm onSubmit={handleUrlShorten} isLoading={isLoading} />

      <ErrorAlert error={error} onClose={() => setError("")} />

      {shortenedUrl && <ShortenedUrlCard shortenedUrl={shortenedUrl} />}
    </motion.div>
  );
};

export default HomePage;
