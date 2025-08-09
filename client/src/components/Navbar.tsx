import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Link as LinkIcon, BarChart3 } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <motion.nav
      className="bg-white shadow-sm border-b border-gray-200"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors duration-200"
          >
            <LinkIcon className="w-6 h-6" />
            <span>HopURL</span>
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                location.pathname === "/"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link
              to="/admin"
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-all duration-200 ${
                location.pathname === "/admin"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
