import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/reports"; // Ensure backend API is correct

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [userId, setUserId] = useState(""); // Should be filled based on logged-in user
  const [adminId, setAdminId] = useState("");
  const [assignedVehicle, setAssignedVehicle] = useState("");
  const [assignedStaff, setAssignedStaff] = useState("");
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
      console.error("❌ Error fetching reports:", error);
    }
  };

  // Add new report
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
        User_ID: userId || null, // Optional
        Admin_ID: adminId || null, // Optional
        Assigned_Vehicle: assignedVehicle || null, // Optional
        Assigned_Staff: assignedStaff || null, // Optional
      });

      setMessage(`✅ Report for "${streetAddress}" added successfully!`);
      setStreetAddress("");
      setCity("");
      setState("");
      setPincode("");
      setDescription("");
      setSeverity("Low");
      setUserId("");
      setAdminId("");
      setAssignedVehicle("");
      setAssignedStaff("");
      fetchReports();
    } catch (error) {
      console.error("❌ Error adding report:", error);
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
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">State</th>
              <th className="border px-4 py-2">Pincode</th>
              <th className="border px-4 py-2">Severity</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Reported By</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.Report_ID} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{report.Report_ID}</td>
                  <td className="border px-4 py-2">{report.Street_Address}</td>
                  <td className="border px-4 py-2">{report.City}</td>
                  <td className="border px-4 py-2">{report.State}</td>
                  <td className="border px-4 py-2">{report.Pincode}</td>
                  <td className="border px-4 py-2">{report.Severity_Level}</td>
                  <td className="border px-4 py-2">{report.Description}</td>
                  <td className="border px-4 py-2">{report.User_ID || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border px-4 py-2 text-center">
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
            placeholder="Street Address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
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
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
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
