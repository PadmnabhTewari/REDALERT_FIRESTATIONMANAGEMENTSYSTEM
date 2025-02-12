const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Get all fire stations
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM FireStation");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new fire station
router.post("/", async (req, res) => {
  const { name, location, contact_number } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO FireStation (Name, Location, Contact_Number) VALUES (?, ?, ?)",
      [name, location, contact_number]
    );
    res.json({ message: "Fire station added", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
