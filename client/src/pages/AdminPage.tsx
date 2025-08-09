import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, ExternalLink, Eye, Calendar } from "lucide-react";

const API_URL = import.meta.env.VITE_API;

interface UrlData {
  original_url: string;
  short_code: string;
  short_url: string;
  visit_count: number;
  created_at: string;
}

const AdminPage: React.FC = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const fetchUrls = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/list`, {
        method: "GET",
        headers: {
          "x-admin-key": key,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid admin key or failed to fetch URLs");
      }

      const result = await response.json();

      // Use the nested urls array from backend
      setUrls(result.data.urls);

      setIsAuthorized(true);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Invalid key or failed to load data");
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Access</h1>
        <input
          type="password"
          placeholder="Enter admin key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full mb-4"
        />
        <button
          onClick={fetchUrls}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Submit
        </button>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="flex items-center justify-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full mb-4"></div>
            <div className="text-gray-600">Loading analytics...</div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="mb-8">
        <motion.div
          className="flex items-center space-x-3 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BarChart3 className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-900">URL Analytics</h1>
        </motion.div>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Monitor your shortened URLs performance and track visitor statistics.
        </motion.p>
      </div>

      {/* Table */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {urls.length === 0 ? (
          <div className="p-12 text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No URLs found
            </h3>
            <p className="text-gray-500">
              Start shortening URLs to see analytics here.
            </p>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200 flex justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                All Shortened URLs ({urls.length})
              </h2>
              <div className="text-sm text-gray-500">
                Total Clicks:{" "}
                {urls.reduce((sum, url) => sum + url.visit_count, 0)}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      URLs
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Clicks
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {urls.map((url, index) => (
                    <motion.tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <a
                            href={url.short_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 font-semibold hover:text-orange-800 flex items-center space-x-1"
                          >
                            <span className="font-mono">{url.short_url}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <div className="text-sm text-gray-500 break-all max-w-md">
                            {url.original_url}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-lg font-semibold text-gray-900">
                          {url.visit_count}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(url.created_at)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <motion.button
                          onClick={() =>
                            navigator.clipboard.writeText(url.short_url)
                          }
                          className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Copy Link
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminPage;
