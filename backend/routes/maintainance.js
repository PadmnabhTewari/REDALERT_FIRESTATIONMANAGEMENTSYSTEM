import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/maintenance";

const Maintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);

  useEffect(() => {
    fetchMaintenanceData();
  }, []);

  const fetchMaintenanceData = async () => {
    try {
      const response = await axios.get(API_URL);
      setMaintenanceData(response.data);
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-pink-400">🚗 Vehicle Maintenance</h1>
      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium text-pink-300 uppercase tracking-wider">Maintenance ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">Vehicle ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">Maintenance Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-red-400 uppercase tracking-wider">Date Performed</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Cost</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Performed By</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {maintenanceData.map((maintenance) => (
            <tr key={maintenance.Maintenance_ID} className="hover:bg-gray-750">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{maintenance.Maintenance_ID}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{maintenance.Vehicle_ID}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{maintenance.Maintenance_Type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{new Date(maintenance.Date_Performed).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${maintenance.Cost.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{maintenance.Performed_By}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Maintenance;
