import React, { useState, useEffect } from "react";
import axios from "axios";

const API_SUPPLIERS = "http://localhost:5000/api/suppliers";
const API_ITEMS = "http://localhost:5000/api/items";
const API_SUPPLIER_ITEMS = "http://localhost:5000/api/supplier-items";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [supplierItems, setSupplierItems] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSuppliers();
    fetchItems();
    fetchSupplierItems();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(API_SUPPLIERS);
      setSuppliers(response.data);
    } catch (error) {
      console.error("❌ Error fetching suppliers:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_ITEMS);
      setItems(response.data);
    } catch (error) {
      console.error("❌ Error fetching items:", error);
    }
  };

  const fetchSupplierItems = async () => {
    try {
      const response = await axios.get(API_SUPPLIER_ITEMS);
      setSupplierItems(response.data);
    } catch (error) {
      console.error("❌ Error fetching supplier items:", error);
    }
  };

  const addSupplier = async (e) => {
    e.preventDefault();
    if (!name || !contact || !email || !address || selectedItems.length === 0) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      const supplierResponse = await axios.post(API_SUPPLIERS, {
        Name: name,
        Contact_Phone: contact,
        Email: email,
        Address: address,
      });

      const supplierId = supplierResponse.data.Supplier_ID;

      await Promise.all(
        selectedItems.map((itemId) =>
          axios.post(API_SUPPLIER_ITEMS, {
            Supplier_ID: supplierId,
            Item_ID: itemId,
          })
        )
      );

      setMessage(`✅ Supplier "${name}" added successfully!`);
      setName("");
      setContact("");
      setEmail("");
      setAddress("");
      setSelectedItems([]);
      fetchSuppliers();
      fetchSupplierItems();
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
              <th className="border-b px-4 py-2">Items Supplied</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <tr key={supplier.Supplier_ID} className="hover:bg-gray-600">
                  <td className="border-b px-4 py-2">{supplier.Supplier_ID}</td>
                  <td className="border-b px-4 py-2">{supplier.Name}</td>
                  <td className="border-b px-4 py-2">{supplier.Contact_Phone}</td>
                  <td className="border-b px-4 py-2">{supplier.Email}</td>
                  <td className="border-b px-4 py-2">{supplier.Address}</td>
                  <td className="border-b px-4 py-2">
                    {supplierItems
                      .filter((si) => si.Supplier_ID === supplier.Supplier_ID)
                      .map((si) => items.find((item) => item.Item_ID === si.Item_ID)?.Name)
                      .join(", ") || "No items"}
                  </td>
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
          <input type="text" placeholder="Contact Phone" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400" required />
          
          <div>
            <label className="text-pink-300">Select Items:</label>
            <div className="grid grid-cols-2 gap-2">
              {items.map((item) => (
                <label key={item.Item_ID} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={item.Item_ID}
                    checked={selectedItems.includes(item.Item_ID)}
                    onChange={(e) => {
                      const itemId = parseInt(e.target.value);
                      setSelectedItems((prev) =>
                        prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
                      );
                    }}
                  />
                  <span>{item.Name}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">➕ Add Supplier</button>
        </form>
      </div>
    </div>
  );
};

export default Suppliers;
