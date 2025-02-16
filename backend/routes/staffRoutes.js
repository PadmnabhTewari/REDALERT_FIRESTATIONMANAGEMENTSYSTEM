const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Get all staff members
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Staff");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching staff members:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new staff member
router.post("/", async (req, res) => {
  const { Name, Designation, Contact, Email, Station_ID, Shift } = req.body;

  // Ensure required fields are provided
  if (!Name || !Designation || !Contact || !Email || !Station_ID || !Shift) {
    return res.status(400).json({ error: "⚠️ All fields are required!" });
  }

  try {
    // Check if FireStation exists before adding staff
    const [station] = await pool.query("SELECT * FROM FireStation WHERE Station_ID = ?", [Station_ID]);
    if (station.length === 0) {
      return res.status(400).json({ error: `❌ Fire Station with ID ${Station_ID} does not exist!` });
    }

    //Insert staff member
    const [result] = await pool.query(
      "INSERT INTO Staff (Name, Designation, Contact, Email, Station_ID, Shift) VALUES (?, ?, ?, ?, ?, ?)",
      [Name, Designation, Contact, Email, Station_ID, Shift]
    );

    res.json({ message: `✅ Staff member "${Name}" added successfully!`, id: result.insertId });
  } catch (error) {
    console.error("❌ Error adding staff:", error);
    res.status(500).json({ error: "Failed to add staff member." });
  }
});

module.exports = router;
