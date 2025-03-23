import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-pink-400 mb-6">🔥 Fire Station</h2>
      <ul className="space-y-3">
        <li>
          <a href="/dashboard" className="block px-4 py-2 rounded bg-gray-800 hover:bg-pink-600 transition">
            📊 Dashboard
          </a>
        </li>
        <li>
          <a href="/fire-stations" className="block px-4 py-2 rounded bg-gray-800 hover:bg-pink-600 transition">
            🚒 Fire Stations
          </a>
        </li>
        <li>
          <a href="/vehicles" className="block px-4 py-2 rounded bg-gray-800 hover:bg-pink-600 transition">
            🚗 Vehicles
          </a>
        </li>
        <li>
          <a href="/staff" className="block px-4 py-2 rounded bg-gray-800 hover:bg-pink-600 transition">
            👨‍🚒 Staff
          </a>
        </li>
        <li>
          <a href="/reports" className="block px-4 py-2 rounded bg-gray-800 hover:bg-pink-600 transition">
            📄 Reports
          </a>
        </li>
        <li>
          <a href="/suppliers" className="block px-4 py-2 rounded bg-gray-800 hover:bg-pink-600 transition">
            📦 Suppliers
          </a>
        </li>
        <li>
          <a href="/inventory" className="block px-4 py-2 rounded bg-gray-800 hover:bg-pink-600 transition">
            🗃 Inventory
          </a>
        </li>
        <li>
          <a href="/maintenance" className="block px-4 py-2 rounded bg-gray-800 hover:bg-pink-600 transition">
            🛠 Maintenance
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;