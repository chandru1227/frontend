import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[rgb(95,57,151)] text-white p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold">Socialio</div>
      
      

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-lg font-medium">
        <a href="/" className="hover:text-yellow-300 transition">Home</a>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
          alt="User Profile"
          className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
        />
      </div>
    </nav>
  );
};

export default Navbar;
