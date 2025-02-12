const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Get all vehicles
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Vehicle");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new vehicle
router.post("/", async (req, res) => {
  const { type, model_no, status, water_capacity, station_id, last_maintenance_date } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO Vehicle (Type, Model_No, Status, Water_Capacity, Station_ID, Last_Maintenance_Date) VALUES (?, ?, ?, ?, ?, ?)",
      [type, model_no, status, water_capacity, station_id, last_maintenance_date]
    );
    res.json({ message: "Vehicle added", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
