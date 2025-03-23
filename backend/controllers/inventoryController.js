const Inventory = require('../models/Iventory');

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.json(inventory);
  } catch (error) {
    console.error("❌ Error fetching inventory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);
    res.status(201).json(inventory);
  } catch (error) {
    console.error("❌ Error creating inventory:", error);
    res.status(500).json({ error: "Failed to create inventory item." });
  }
};