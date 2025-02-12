import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/vehicles";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Available");
  const [message, setMessage] = useState("");

  // Fetch vehicle data
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(API_URL);
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  // Add new vehicle
  const addVehicle = async (e) => {
    e.preventDefault();
    if (!name || !type) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    try {
      await axios.post(API_URL, { name, type, status });
      setMessage(`✅ Vehicle "${name}" added!`);
      setName("");
      setType("");
      setStatus("Available");
      fetchVehicles();
    } catch (error) {
      console.error("Error adding vehicle:", error);
      setMessage("❌ Failed to add vehicle.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🚒 Fire Station Vehicles</h1>

      {message && <p className="bg-blue-100 text-blue-700 p-2 rounded mb-4">{message}</p>}

      {/* Vehicle List */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Registered Vehicles</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{vehicle.id}</td>
                  <td className="border px-4 py-2">{vehicle.name}</td>
                  <td className="border px-4 py-2">{vehicle.type}</td>
                  <td className="border px-4 py-2">{vehicle.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center">
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Vehicle Form */}
      <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Add New Vehicle</h2>
        <form onSubmit={addVehicle} className="space-y-3">
          <input
            type="text"
            placeholder="Vehicle Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Vehicle Type (e.g., Fire Truck, Ambulance)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default Vehicles;
