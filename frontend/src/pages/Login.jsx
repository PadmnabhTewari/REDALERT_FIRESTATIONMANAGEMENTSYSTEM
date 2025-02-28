import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, { userName, password });
      if (response.status === 200) {
        navigate("/dashboard");
      }
      setMessage(`✅ Login successful! Welcome, ${response.data.user}.`);
    } catch (error) {
      setMessage("❌ Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }

    setUserName("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-pink-400">
          🔥 Fire Station Login
        </h1>

        {message && <p className="text-center mb-4 text-yellow-400">{message}</p>}

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-700 text-white focus:ring focus:ring-pink-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-700 text-white focus:ring focus:ring-pink-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

