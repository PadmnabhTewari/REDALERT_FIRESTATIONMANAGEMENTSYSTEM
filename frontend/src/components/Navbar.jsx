import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-400">🚒 Fire Station Management</h1>
        <div className="space-x-6">
          <a href="/dashboard" className="text-pink-400 hover:text-pink-300 transition">Dashboard</a>
          <a href="/fire-stations" className="text-pink-400 hover:text-pink-300 transition">Fire Stations</a>
          <a href="/vehicles" className="text-pink-400 hover:text-pink-300 transition">Vehicles</a>
          <a href="/staff" className="text-pink-400 hover:text-pink-300 transition">Staff</a>
          <a href="/reports" className="text-pink-400 hover:text-pink-300 transition">Reports</a>
          <a href="/login" className="text-pink-400 hover:text-pink-300 transition">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
