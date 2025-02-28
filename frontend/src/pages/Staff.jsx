import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/staff"; // Ensure backend API is correct

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [stationId, setStationId] = useState("");
  const [shift, setShift] = useState("Morning");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(API_URL);
      setStaffList(response.data);
    } catch (error) {
      console.error("❌ Error fetching staff:", error);
    }
  };

  const addStaff = async (e) => {
    e.preventDefault();
    if (!name || !designation || !contact || !email || !stationId || !shift) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      await axios.post(API_URL, {
        Name: name,
        Designation: designation,
        Contact: contact,
        Email: email,
        Station_ID: stationId,
        Shift: shift,
      });

      setMessage(`✅ Staff member "${name}" added successfully!`);
      setName("");
      setDesignation("");
      setContact("");
      setEmail("");
      setStationId("");
      setShift("Morning");
      fetchStaff();
    } catch (error) {
      console.error("❌ Error adding staff:", error);
      setMessage("❌ Failed to add staff member.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-pink-400">👨‍🚒 Fire Station Staff</h1>

      {message && <p className="bg-gray-800 text-pink-300 p-2 rounded mb-4">{message}</p>}

      {/* Staff List */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Staff Members</h2>
        <table className="min-w-full bg-gray-700 text-white border border-gray-700">
          <thead>
            <tr className="bg-gray-600 text-pink-300">
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Name</th>
              <th className="border-b px-4 py-2">Designation</th>
              <th className="border-b px-4 py-2">Contact</th>
              <th className="border-b px-4 py-2">Email</th>
              <th className="border-b px-4 py-2">Station ID</th>
              <th className="border-b px-4 py-2">Shift</th>
            </tr>
          </thead>
          <tbody>
            {staffList.length > 0 ? (
              staffList.map((staff) => (
                <tr key={staff.Staff_ID} className="hover:bg-gray-600">
                  <td className="border-b px-4 py-2">{staff.Staff_ID}</td>
                  <td className="border-b px-4 py-2">{staff.Name}</td>
                  <td className="border-b px-4 py-2">{staff.Designation}</td>
                  <td className="border-b px-4 py-2">{staff.Contact}</td>
                  <td className="border-b px-4 py-2">{staff.Email}</td>
                  <td className="border-b px-4 py-2">{staff.Station_ID}</td>
                  <td className="border-b px-4 py-2">{staff.Shift}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border-b px-4 py-2 text-center text-pink-300">
                  No staff members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Staff Form */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Add New Staff Member</h2>
        <form onSubmit={addStaff} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            placeholder="Designation (e.g., Firefighter, Chief)"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="number"
            placeholder="Fire Station ID"
            value={stationId}
            onChange={(e) => setStationId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
          >
            ➕ Add Staff
          </button>
        </form>
      </div>
    </div>
  );
};

export default Staff;
