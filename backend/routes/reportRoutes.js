const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Get all reports
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Report");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new report
router.post("/", async (req, res) => {
  const { street_address, city, state, pincode, description, severity_level, user_id } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO Report (Street_Address, City, State, Pincode, Description, Severity_Level, User_ID) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [street_address, city, state, pincode, description, severity_level, user_id]
    );
    res.json({ message: "Report added", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
