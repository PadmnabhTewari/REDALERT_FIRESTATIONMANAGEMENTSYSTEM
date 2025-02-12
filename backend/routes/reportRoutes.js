const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// 🚀 Get all reports
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Report");
    res.json(rows);
  } catch (error) {
    console.error("❌ Error fetching reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🚀 Add a new report
router.post("/", async (req, res) => {
  const {
    Street_Address,
    City,
    State,
    Pincode,
    Description,
    Severity_Level,
    User_ID,
    Admin_ID,
    Assigned_Vehicle,
    Assigned_Staff,
  } = req.body;

  // ✅ Ensure required fields are provided
  if (!Street_Address || !City || !State || !Pincode || !Description || !Severity_Level) {
    return res.status(400).json({ error: "⚠️ All required fields must be filled!" });
  }

  try {
    // ✅ Insert report into database
    const [result] = await pool.query(
      `INSERT INTO Report (Street_Address, City, State, Pincode, Description, Severity_Level, User_ID, Admin_ID, Assigned_Vehicle, Assigned_Staff) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Street_Address,
        City,
        State,
        Pincode,
        Description,
        Severity_Level,
        User_ID || null, // Optional
        Admin_ID || null, // Optional
        Assigned_Vehicle || null, // Optional
        Assigned_Staff || null, // Optional
      ]
    );

    res.json({ message: `✅ Report added successfully!`, id: result.insertId });
  } catch (error) {
    console.error("❌ Error adding report:", error);
    res.status(500).json({ error: "Failed to add report." });
  }
});

module.exports = router;
