const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Get all fire stations
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM FireStation");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching fire stations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Add a new fire station
router.post("/", async (req, res) => {
  const { Name, Location, Contact_Number, Total_Staff, Total_Vehicles } = req.body;

  //Ensure required fields are provided
  if (!Name || !Location || !Contact_Number) {
    return res.status(400).json({ error: "⚠️ Name, Location, and Contact Number are required!" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO FireStation (Name, Location, Contact_Number, Total_Staff, Total_Vehicles) VALUES (?, ?, ?, ?, ?)",
      [Name, Location, Contact_Number, Total_Staff || 0, Total_Vehicles || 0] // Defaults to 0 if missing
    );
    res.json({ message: `✅ Fire station "${Name}" added!`, id: result.insertId });
  } catch (error) {
    console.error("❌ Error adding fire station:", error);
    res.status(500).json({ error: "Failed to add fire station." });
  }
});

module.exports = router;
