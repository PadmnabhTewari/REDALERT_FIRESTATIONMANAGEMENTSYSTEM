import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {

  const [userName, setuserName] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    const result = axios.post('http://localhost:5000/api/auth/login');
    console.log(result);
    setuserName('');
    setPassword('');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={(e)=>{submitHandler(e)}} >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" value={userName} onChange={(e)=>{setuserName(e.target.value)}} >Username</label>
            <input type="text" className="w-full p-2 border rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" value={password} onChange={(e)=>{setPassword(e.target.value)}} >Password</label>
            <input type="password" className="w-full p-2 border rounded-lg" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;