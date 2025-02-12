import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/staff";

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  // Fetch staff data
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(API_URL);
      setStaffList(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  // Add new staff
  const addStaff = async (e) => {
    e.preventDefault();
    if (!name || !role || !contact) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    try {
      await axios.post(API_URL, { name, role, contact });
      setMessage(`✅ Staff member "${name}" added!`);
      setName("");
      setRole("");
      setContact("");
      fetchStaff();
    } catch (error) {
      console.error("Error adding staff:", error);
      setMessage("❌ Failed to add staff member.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🚒 Fire Station Staff</h1>

      {message && <p className="bg-blue-100 text-blue-700 p-2 rounded mb-4">{message}</p>}

      {/* Staff List */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Staff Members</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {staffList.length > 0 ? (
              staffList.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{staff.id}</td>
                  <td className="border px-4 py-2">{staff.name}</td>
                  <td className="border px-4 py-2">{staff.role}</td>
                  <td className="border px-4 py-2">{staff.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center">
                  No staff members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Staff Form */}
      <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Add New Staff Member</h2>
        <form onSubmit={addStaff} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Add Staff
          </button>
        </form>
      </div>
    </div>
  );
};

export default Staff;
