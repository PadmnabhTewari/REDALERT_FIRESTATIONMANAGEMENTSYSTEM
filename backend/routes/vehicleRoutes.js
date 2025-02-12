const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Get all vehicles
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Vehicle");
    console.log("Fetched all rows from Vehicle");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
    console.log("🚀 Vehicle request received:", req.body); // Log request body
  
    const { type, model_no, status, water_capacity, station_id, last_maintenance_date } = req.body;
  
    if (!type || !model_no || !status || !station_id) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      const [result] = await pool.query(
        "INSERT INTO Vehicle (Type, Model_No, Status, Water_Capacity, Station_ID, Last_Maintenance_Date) VALUES (?, ?, ?, ?, ?, ?)",
        [type, model_no, status, water_capacity, station_id, last_maintenance_date]
      );
  
      console.log("✅ Vehicle added to database, ID:", result.insertId);
      res.json({ message: "Vehicle added", id: result.insertId });
    } catch (error) {
      console.error("❌ Database error:", error);
      res.status(500).json({ error: "Failed to add vehicle." });
    }
  });

module.exports = router;
