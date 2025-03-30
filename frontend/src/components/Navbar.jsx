import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

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
          {token ? (
            <>
              <span className="text-pink-400">
                {userRole === 'admin' ? '👑 Admin' : '👤 User'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-pink-400 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-pink-400 text-white px-4 py-2 rounded-full hover:bg-pink-500 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
