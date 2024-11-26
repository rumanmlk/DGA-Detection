import React from 'react';
import {Link}  from 'react-router-dom'; // Assuming you're using React Router for navigation

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">
          <Link to="/">AI Domain Detector</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-200">About Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
