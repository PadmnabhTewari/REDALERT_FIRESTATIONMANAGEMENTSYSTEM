import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import React from 'react';


const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
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
          {user ? <UserButton /> :
            <button onClick={() => {
              openSignIn()
              console.log("clicked");
            }} className='bg-pink-400 text-white px-4 py-2 rounded-full'>
              Create Account
            </button>
          }
          {/* <button onClick={()=>openSignIn()} className="text-pink-400 hover:text-pink-300 transition">Login</button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
