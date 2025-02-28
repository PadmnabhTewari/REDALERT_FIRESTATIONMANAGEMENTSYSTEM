import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/fire-stations";

const FireStations = () => {
  const [fireStations, setFireStations] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [totalStaff, setTotalStaff] = useState("");
  const [totalVehicles, setTotalVehicles] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFireStations();
  }, []);

  const fetchFireStations = async () => {
    try {
      const response = await axios.get(API_URL);
      setFireStations(response.data);
    } catch (error) {
      console.error("❌ Error fetching fire stations:", error);
    }
  };

  const addFireStation = async (e) => {
    e.preventDefault();
    if (!name || !location || !contactNumber) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      await axios.post(API_URL, {
        Name: name,
        Location: location,
        Contact_Number: contactNumber,
        Total_Staff: totalStaff || 0,
        Total_Vehicles: totalVehicles || 0,
      });

      setMessage(`✅ Fire station "${name}" added successfully!`);
      setName("");
      setLocation("");
      setContactNumber("");
      setTotalStaff("");
      setTotalVehicles("");
      fetchFireStations();
    } catch (error) {
      console.error("❌ Error adding fire station:", error);
      setMessage("❌ Failed to add fire station.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-pink-400">🚒 Fire Stations</h1>

      {message && <p className="bg-gray-800 text-pink-300 p-2 rounded mb-4">{message}</p>}

      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Registered Fire Stations</h2>
        <table className="min-w-full bg-gray-700 text-white border border-gray-700">
          <thead>
            <tr className="bg-gray-600 text-pink-300">
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Name</th>
              <th className="border-b px-4 py-2">Location</th>
              <th className="border-b px-4 py-2">Contact</th>
              <th className="border-b px-4 py-2">Total Staff</th>
              <th className="border-b px-4 py-2">Total Vehicles</th>
            </tr>
          </thead>
          <tbody>
            {fireStations.length > 0 ? (
              fireStations.map((station) => (
                <tr key={station.Station_ID} className="hover:bg-gray-600">
                  <td className="border-b px-4 py-2">{station.Station_ID}</td>
                  <td className="border-b px-4 py-2">{station.Name}</td>
                  <td className="border-b px-4 py-2">{station.Location}</td>
                  <td className="border-b px-4 py-2">{station.Contact_Number}</td>
                  <td className="border-b px-4 py-2">{station.Total_Staff}</td>
                  <td className="border-b px-4 py-2">{station.Total_Vehicles}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border-b px-4 py-2 text-center text-pink-300">
                  No fire stations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800 shadow-lg rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Add New Fire Station</h2>
        <form onSubmit={addFireStation} className="space-y-3">
          <input type="text" placeholder="Fire Station Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <input type="number" placeholder="Total Staff" value={totalStaff} onChange={(e) => setTotalStaff(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" />
          <input type="number" placeholder="Total Vehicles" value={totalVehicles} onChange={(e) => setTotalVehicles(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" />
          <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">➕ Add Fire Station</button>
        </form>
      </div>
    </div>
  );
};

export default FireStations;
