const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Get all vehicles with model details
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT v.Vehicle_ID, vm.Type, vm.Model_No, v.Status, v.Station_ID, v.Last_Maintenance_Date
      FROM Vehicle v
      JOIN VehicleModel vm ON v.Type = vm.Type AND v.Model_No = vm.Model_No
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching vehicles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new vehicle
router.post("/", async (req, res) => {
  console.log("🚀 Vehicle request received:", req.body);

  const { type, model_no, status, water_capacity, station_id, last_maintenance_date } = req.body;

  if (!type || !model_no || !status || !station_id) {
    console.log("❌ Missing required fields");
    return res.status(400).json({ error: "Missing required fields" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Ensure the vehicle model exists
    const [modelCheck] = await connection.query(
      "SELECT * FROM VehicleModel WHERE Type = ? AND Model_No = ?",
      [type, model_no]
    );

    if (modelCheck.length === 0) {
      console.log("❌ Vehicle model does not exist");
      await connection.rollback();
      return res.status(400).json({ error: "Invalid vehicle model. Please add the model first." });
    }

    const [result] = await connection.query(
      "INSERT INTO Vehicle (Type, Model_No, Status, Station_ID, Last_Maintenance_Date) VALUES (?, ?, ?, ?, ?)",
      [type, model_no, status, station_id, last_maintenance_date || new Date()]
    );

    await connection.commit();
    console.log("✅ Vehicle added to database, ID:", result.insertId);
    res.json({ message: "✅ Vehicle added", id: result.insertId });
  } catch (error) {
    await connection.rollback();
    console.error("❌ Database error:", error);
    res.status(500).json({ error: "Failed to add vehicle." });
  } finally {
    connection.release();
  }
});

module.exports = router;
