import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/suppliers"; // Adjust as needed

const RegisterSupplier = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !contact || !address) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    try {
      await axios.post(API_URL, {
        Supplier_Name: name,
        Contact_Info: contact,
        Address: address,
      });

      setMessage(`✅ Supplier "${name}" registered successfully!`);
      setName("");
      setContact("");
      setAddress("");
    } catch (error) {
      console.error("❌ Error registering supplier:", error);
      setMessage("❌ Failed to register supplier.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-pink-400">🏭 Register Supplier</h1>

      {message && <p className="bg-gray-800 text-pink-300 p-2 rounded mb-4">{message}</p>}

      <form onSubmit={handleRegister} className="space-y-3 bg-gray-800 p-4 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Supplier Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-pink-400"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:ring-2 focus:ring-pink-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          ➕ Register Supplier
        </button>
      </form>
    </div>
  );
};

export default RegisterSupplier;
