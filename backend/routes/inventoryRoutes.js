const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Get all inventory items
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Inventory");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching inventory items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new inventory item
router.post("/", async (req, res) => {
  const { Item_Name, Quantity, Station_ID, Supplier_ID } = req.body;

  // Ensure required fields are provided
  if (!Item_Name || !Quantity || !Station_ID || !Supplier_ID) {
    return res.status(400).json({ error: "⚠️ All fields are required!" });
  }

  try {
    // Check if FireStation exists before adding inventory
    const [station] = await pool.query("SELECT * FROM FireStation WHERE Station_ID = ?", [Station_ID]);
    if (station.length === 0) {
      return res.status(400).json({ error: `❌ Fire Station with ID ${Station_ID} does not exist!` });
    }

    // Check if Supplier exists before adding inventory
    const [supplier] = await pool.query("SELECT * FROM Supplier WHERE Supplier_ID = ?", [Supplier_ID]);
    if (supplier.length === 0) {
      return res.status(400).json({ error: `❌ Supplier with ID ${Supplier_ID} does not exist!` });
    }

    // Insert inventory item
    const [result] = await pool.query(
      "INSERT INTO Inventory (Item_Name, Quantity, Station_ID, Supplier_ID) VALUES (?, ?, ?, ?)",
      [Item_Name, Quantity, Station_ID, Supplier_ID]
    );

    res.json({ message: `✅ Inventory item "${Item_Name}" added successfully!`, id: result.insertId });
  } catch (error) {
    console.error("❌ Error adding inventory item:", error);
    res.status(500).json({ error: "Failed to add inventory item." });
  }
});

module.exports = router;