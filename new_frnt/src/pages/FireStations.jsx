import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/fire-stations";

const FireStations = () => {
  const [fireStations, setFireStations] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Active");
  const [message, setMessage] = useState("");

  // Fetch fire station data
  useEffect(() => {
    fetchFireStations();
  }, []);

  const fetchFireStations = async () => {
    try {
      const response = await axios.get(API_URL);
      setFireStations(response.data);
    } catch (error) {
      console.error("Error fetching fire stations:", error);
    }
  };

  // Add new fire station
  const addFireStation = async (e) => {
    e.preventDefault();
    if (!name || !location) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    try {
      await axios.post(API_URL, { name, location, status });
      setMessage(`✅ Fire station "${name}" added!`);
      setName("");
      setLocation("");
      setStatus("Active");
      fetchFireStations();
    } catch (error) {
      console.error("Error adding fire station:", error);
      setMessage("❌ Failed to add fire station.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🚒 Fire Stations</h1>

      {message && <p className="bg-blue-100 text-blue-700 p-2 rounded mb-4">{message}</p>}

      {/* Fire Station List */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Registered Fire Stations</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {fireStations.length > 0 ? (
              fireStations.map((station) => (
                <tr key={station.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{station.id}</td>
                  <td className="border px-4 py-2">{station.name}</td>
                  <td className="border px-4 py-2">{station.location}</td>
                  <td className="border px-4 py-2">{station.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center">
                  No fire stations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Fire Station Form */}
      <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Add New Fire Station</h2>
        <form onSubmit={addFireStation} className="space-y-3">
          <input
            type="text"
            placeholder="Fire Station Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Add Fire Station
          </button>
        </form>
      </div>
    </div>
  );
};

export default FireStations;
