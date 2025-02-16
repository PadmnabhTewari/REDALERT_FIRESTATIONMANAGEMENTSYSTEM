import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fire Station Management</h1>
        <div className="space-x-4">
          <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
          <a href="/fire-stations" className="hover:text-gray-300">Fire Stations</a>
          <a href="/vehicles" className="hover:text-gray-300">Vehicles</a>
          <a href="/staff" className="hover:text-gray-300">Staff</a>
          <a href="/reports" className="hover:text-gray-300">Reports</a>
          <a href="/login" className="hover:text-gray-300">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;