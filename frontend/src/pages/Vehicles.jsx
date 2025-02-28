import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/vehicles";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [type, setType] = useState("");
  const [modelNo, setModelNo] = useState("");
  const [status, setStatus] = useState("Available");
  const [waterCapacity, setWaterCapacity] = useState("");
  const [stationId, setStationId] = useState("");
  const [lastMaintenance, setLastMaintenance] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(API_URL);
      setVehicles(response.data);
    } catch (error) {
      console.error("❌ Error fetching vehicles:", error);
    }
  };

  const addVehicle = async (e) => {
    e.preventDefault();
    if (!type || !modelNo || !stationId) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      await axios.post(API_URL, {
        type,
        model_no: modelNo,
        status,
        water_capacity: waterCapacity || 0,
        station_id: stationId,
        last_maintenance_date: lastMaintenance || null,
      });

      setMessage(`✅ Vehicle "${type}" added successfully!`);
      setType("");
      setModelNo("");
      setStatus("Available");
      setWaterCapacity("");
      setStationId("");
      setLastMaintenance("");
      fetchVehicles();
    } catch (error) {
      console.error("❌ Error adding vehicle:", error);
      setMessage("❌ Failed to add vehicle.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-pink-400">🚒 Fire Station Vehicles</h1>

      {message && <p className="bg-gray-800 text-pink-300 p-2 rounded mb-4">{message}</p>}

      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Registered Vehicles</h2>
        <table className="min-w-full bg-gray-700 text-white border border-gray-700">
          <thead>
            <tr className="bg-gray-600 text-pink-300">
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Type</th>
              <th className="border-b px-4 py-2">Model No</th>
              <th className="border-b px-4 py-2">Status</th>
              <th className="border-b px-4 py-2">Water Capacity</th>
              <th className="border-b px-4 py-2">Station ID</th>
              <th className="border-b px-4 py-2">Last Maintenance</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr key={vehicle.Vehicle_ID} className="hover:bg-gray-600">
                  <td className="border-b px-4 py-2">{vehicle.Vehicle_ID}</td>
                  <td className="border-b px-4 py-2">{vehicle.Type}</td>
                  <td className="border-b px-4 py-2">{vehicle.Model_No}</td>
                  <td className="border-b px-4 py-2">{vehicle.Status}</td>
                  <td className="border-b px-4 py-2">{vehicle.Water_Capacity}</td>
                  <td className="border-b px-4 py-2">{vehicle.Station_ID}</td>
                  <td className="border-b px-4 py-2">{vehicle.Last_Maintenance_Date || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border-b px-4 py-2 text-center text-pink-300">
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800 shadow-lg rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Add New Vehicle</h2>
        <form onSubmit={addVehicle} className="space-y-3">
          <input type="text" placeholder="Vehicle Type" value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <input type="text" placeholder="Model Number" value={modelNo} onChange={(e) => setModelNo(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400">
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
          <input type="number" placeholder="Water Capacity (Liters)" value={waterCapacity} onChange={(e) => setWaterCapacity(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" />
          <input type="number" placeholder="Station ID" value={stationId} onChange={(e) => setStationId(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <input type="datetime-local" placeholder="Last Maintenance Date" value={lastMaintenance} onChange={(e) => setLastMaintenance(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" />
          <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">➕ Add Vehicle</button>
        </form>
      </div>
    </div>
  );
};

export default Vehicles;
