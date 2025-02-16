const express = require("express");
const router = express.Router();

// Dummy login endpoint
router.post("/login", (req, res) => {
  const { userName, password } = req.body;

  if (userName === "admin" && password === "password123") {
    res.status(200).json({ message: "Login successful", user: userName });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
