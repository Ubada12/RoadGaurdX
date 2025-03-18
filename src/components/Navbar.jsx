import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavLink = ({ href, children }) => (
  <Link
    to={href}
    className="relative px-4 py-2 text-lg font-medium text-white transition-all duration-300 ease-in-out hover:text-gray-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-blue-400 before:transition-all before:duration-300 hover:before:w-full"
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-700 shadow-lg w-full relative">
      <div className="flex items-center justify-between px-6 py-4 h-20">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
          <img
            src="../RoadGuardX.png"
            alt="Custom Icon"
            className="h-12 w-12 transition-all duration-500 hover:scale-110"
          />
            <div className="ml-3 flex flex-col">
              <span className="text-2xl font-bold text-white tracking-wide">
                RoadGaurdX
              </span>
              <span className="text-xs text-gray-300">
                Explainable Artificial Intelligence-Real Time Hazard Prediction & Prevention System
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/predictions">Predictions</NavLink>
          <NavLink href="/analytics">Analytics</NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Menu className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-20 left-0 right-0 bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/predictions">Predictions</NavLink>
          <NavLink href="/analytics">Analytics</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
