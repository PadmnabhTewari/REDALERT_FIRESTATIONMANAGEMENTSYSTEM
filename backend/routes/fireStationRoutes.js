const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Get all fire stations with location
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT fs.Station_ID, fs.Name, fsl.Location, fs.Contact_Number, fs.Total_Staff, fs.Total_Vehicles
      FROM FireStation fs
      LEFT JOIN FireStationLocation fsl ON fs.Station_ID = fsl.Station_ID
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching fire stations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new fire station with location
router.post("/", async (req, res) => {
  const { Name, Location, Contact_Number, Total_Staff, Total_Vehicles } = req.body;

  if (!Name || !Location || !Contact_Number) {
    return res.status(400).json({ error: "⚠️ Name, Location, and Contact Number are required!" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      "INSERT INTO FireStation (Name, Contact_Number, Total_Staff, Total_Vehicles) VALUES (?, ?, ?, ?)",
      [Name, Contact_Number, Total_Staff || 0, Total_Vehicles || 0]
    );

    await connection.query(
      "INSERT INTO FireStationLocation (Location, Station_ID) VALUES (?, ?)",
      [Location, result.insertId]
    );

    await connection.commit();
    res.json({ message: `✅ Fire station "${Name}" added!`, id: result.insertId });
  } catch (error) {
    await connection.rollback();
    console.error("❌ Error adding fire station:", error);
    res.status(500).json({ error: "Failed to add fire station." });
  } finally {
    connection.release();
  }
});

module.exports = router;
