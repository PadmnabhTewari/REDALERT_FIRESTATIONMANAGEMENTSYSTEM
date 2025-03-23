import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/suppliers";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [itemProvided, setItemProvided] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(API_URL);
      setSuppliers(response.data);
    } catch (error) {
      console.error("❌ Error fetching suppliers:", error);
    }
  };

  const addSupplier = async (e) => {
    e.preventDefault();
    if (!name || !contact || !email || !address || !itemProvided) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      await axios.post(API_URL, {
        Name: name,
        Contact: contact,
        Email: email,
        Address: address,
        Item_Provided: itemProvided,
      });

      setMessage(`✅ Supplier "${name}" added successfully!`);
      setName("");
      setContact("");
      setEmail("");
      setAddress("");
      setItemProvided("");
      fetchSuppliers();
    } catch (error) {
      console.error("❌ Error adding supplier:", error);
      setMessage("❌ Failed to add supplier.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-pink-400">📦 Suppliers</h1>

      {message && <p className="bg-gray-800 text-pink-300 p-2 rounded mb-4">{message}</p>}

      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Registered Suppliers</h2>
        <table className="min-w-full bg-gray-700 text-white border border-gray-700">
          <thead>
            <tr className="bg-gray-600 text-pink-300">
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Name</th>
              <th className="border-b px-4 py-2">Contact</th>
              <th className="border-b px-4 py-2">Email</th>
              <th className="border-b px-4 py-2">Address</th>
              <th className="border-b px-4 py-2">Item Provided</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <tr key={supplier.Supplier_ID} className="hover:bg-gray-600">
                  <td className="border-b px-4 py-2">{supplier.Supplier_ID}</td>
                  <td className="border-b px-4 py-2">{supplier.Name}</td>
                  <td className="border-b px-4 py-2">{supplier.Contact}</td>
                  <td className="border-b px-4 py-2">{supplier.Email}</td>
                  <td className="border-b px-4 py-2">{supplier.Address}</td>
                  <td className="border-b px-4 py-2">{supplier.Item_Provided}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border-b px-4 py-2 text-center text-pink-300">
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-800 shadow-lg rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Add New Supplier</h2>
        <form onSubmit={addSupplier} className="space-y-3">
          <input type="text" placeholder="Supplier Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <input type="text" placeholder="Item Provided" value={itemProvided} onChange={(e) => setItemProvided(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">➕ Add Supplier</button>
        </form>
      </div>
    </div>
  );
};

export default Suppliers;