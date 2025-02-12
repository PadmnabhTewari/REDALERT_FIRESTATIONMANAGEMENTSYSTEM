import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li><a href="/dashboard" className="hover:text-gray-400">Dashboard</a></li>
        <li><a href="/fire-stations" className="hover:text-gray-400">Fire Stations</a></li>
        <li><a href="/vehicles" className="hover:text-gray-400">Vehicles</a></li>
        <li><a href="/staff" className="hover:text-gray-400">Staff</a></li>
        <li><a href="/reports" className="hover:text-gray-400">Reports</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;