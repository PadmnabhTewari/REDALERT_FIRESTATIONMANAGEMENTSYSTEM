import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(API_URL);
      setReports(response.data);
    } catch (error) {
      console.error("❌ Error fetching reports:", error);
    }
  };

  const addReport = async (e) => {
    e.preventDefault();
    if (!streetAddress || !city || !state || !pincode || !description || !severity) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }
    try {
      await axios.post(API_URL, {
        Street_Address: streetAddress,
        City: city,
        State: state,
        Pincode: pincode,
        Description: description,
        Severity_Level: severity,
      });
      setMessage(`✅ Report for "${streetAddress}" added successfully!`);
      setStreetAddress("");
      setCity("");
      setState("");
      setPincode("");
      setDescription("");
      setSeverity("Low");
      fetchReports();
    } catch (error) {
      console.error("❌ Error adding report:", error);
      setMessage("❌ Failed to add report.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-pink-400">🔥 Fire Incident Reports</h1>

      {message && <p className="bg-gray-800 text-pink-300 p-2 rounded mb-4">{message}</p>}

      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Reported Incidents</h2>
        <table className="min-w-full bg-gray-700 text-white border border-gray-700">
          <thead>
            <tr className="bg-gray-600 text-pink-300">
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Address</th>
              <th className="border-b px-4 py-2">City</th>
              <th className="border-b px-4 py-2">State</th>
              <th className="border-b px-4 py-2">Pincode</th>
              <th className="border-b px-4 py-2">Severity</th>
              <th className="border-b px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.Report_ID} className="hover:bg-gray-600">
                  <td className="border-b px-4 py-2">{report.Report_ID}</td>
                  <td className="border-b px-4 py-2">{report.Street_Address}</td>
                  <td className="border-b px-4 py-2">{report.City}</td>
                  <td className="border-b px-4 py-2">{report.State}</td>
                  <td className="border-b px-4 py-2">{report.Pincode}</td>
                  <td className="border-b px-4 py-2">{report.Severity_Level}</td>
                  <td className="border-b px-4 py-2">{report.Description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border-b px-4 py-2 text-center text-pink-300">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800 shadow-lg rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Add New Report</h2>
        <form onSubmit={addReport} className="space-y-3">
          <input
            type="text"
            placeholder="Street Address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <textarea
            placeholder="Description of Incident"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
          >
            ➕ Add Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reports;
