import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/inventory"; // Ensure backend API is correct

const Inventory = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stationId, setStationId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(API_URL);
      setInventoryList(response.data);
    } catch (error) {
      console.error("❌ Error fetching inventory:", error);
    }
  };

  const addInventory = async (e) => {
    e.preventDefault();
    if (!itemName || !quantity || !stationId || !supplierId) {
      setMessage("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      await axios.post(API_URL, {
        Item_Name: itemName,
        Quantity: quantity,
        Station_ID: stationId,
        Supplier_ID: supplierId,
      });

      setMessage(`✅ Inventory item "${itemName}" added successfully!`);
      setItemName("");
      setQuantity("");
      setStationId("");
      setSupplierId("");
      fetchInventory();
    } catch (error) {
      console.error("❌ Error adding inventory item:", error);
      setMessage("❌ Failed to add inventory item.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-pink-400">📦 Inventory Management</h1>

      {message && <p className="bg-gray-800 text-pink-300 p-2 rounded mb-4">{message}</p>}

      {/* Inventory List */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Inventory Items</h2>
        <table className="min-w-full bg-gray-700 text-white border border-gray-700">
          <thead>
            <tr className="bg-gray-600 text-pink-300">
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Item Name</th>
              <th className="border-b px-4 py-2">Quantity</th>
              <th className="border-b px-4 py-2">Station ID</th>
              <th className="border-b px-4 py-2">Supplier ID</th>
              <th className="border-b px-4 py-2">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {inventoryList.length > 0 ? (
              inventoryList.map((item) => (
                <tr key={item.Inventory_ID} className="hover:bg-gray-600">
                  <td className="border-b px-4 py-2">{item.Inventory_ID}</td>
                  <td className="border-b px-4 py-2">{item.Item_Name}</td>
                  <td className="border-b px-4 py-2">{item.Quantity}</td>
                  <td className="border-b px-4 py-2">{item.Station_ID}</td>
                  <td className="border-b px-4 py-2">{item.Supplier_ID}</td>
                  <td className="border-b px-4 py-2">{new Date(item.Last_Updated).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border-b px-4 py-2 text-center text-pink-300">
                  No inventory items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Inventory Form */}
      <div className="bg-gray-800 shadow-lg rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Add New Inventory Item</h2>
        <form onSubmit={addInventory} className="space-y-3">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
          <input
            type="number"
            placeholder="Supplier ID"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
          >
            ➕ Add Inventory Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inventory;