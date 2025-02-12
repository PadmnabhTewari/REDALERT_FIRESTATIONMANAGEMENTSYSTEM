import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [message, setMessage] = useState("");

  // Fetch reports from the API
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(API_URL);
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  // Add new report
  const addReport = async (e) => {
    e.preventDefault();
    if (!location || !description) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    try {
      await axios.post(API_URL, { location, description, status });
      setMessage(`✅ Report for "${location}" added!`);
      setLocation("");
      setDescription("");
      setStatus("Pending");
      fetchReports();
    } catch (error) {
      console.error("Error adding report:", error);
      setMessage("❌ Failed to add report.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🔥 Fire Incident Reports</h1>

      {message && <p className="bg-blue-100 text-blue-700 p-2 rounded mb-4">{message}</p>}

      {/* Reports List */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Reported Incidents</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{report.id}</td>
                  <td className="border px-4 py-2">{report.location}</td>
                  <td className="border px-4 py-2">{report.description}</td>
                  <td className="border px-4 py-2">{report.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Report Form */}
      <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Add New Report</h2>
        <form onSubmit={addReport} className="space-y-3">
          <input
            type="text"
            placeholder="Location of Incident"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <textarea
            placeholder="Description of Incident"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            ➕ Add Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reports;
