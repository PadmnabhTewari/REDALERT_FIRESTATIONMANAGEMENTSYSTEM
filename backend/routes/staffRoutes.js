const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Get all staff
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Staff");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new staff member
router.post("/", async (req, res) => {
  const { name, designation, contact, email, station_id, shift } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO Staff (Name, Designation, Contact, Email, Station_ID, Shift) VALUES (?, ?, ?, ?, ?, ?)",
      [name, designation, contact, email, station_id, shift]
    );
    res.json({ message: "Staff added", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
