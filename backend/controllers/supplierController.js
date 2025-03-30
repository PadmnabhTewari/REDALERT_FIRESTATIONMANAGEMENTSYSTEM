const pool = require("../config/db");

// Create a new supplier
exports.createSupplier = async (req, res) => {
  const { Name, Contact, Address } = req.body;

  if (!Name || !Contact || !Address) {
    return res.status(400).json({ error: "⚠️ All fields are required!" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO Supplier (Name, Contact, Address) VALUES (?, ?, ?)",
      [Name, Contact, Address]
    );
    
    res.status(201).json({ id: result.insertId, message: "✅ Supplier added successfully!" });
  } catch (error) {
    console.error("❌ Error creating supplier:", error);
    res.status(500).json({ error: "Failed to create supplier" });
  }
};

// Get all suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const [suppliers] = await pool.query("SELECT * FROM Supplier");
    res.json(suppliers);
  } catch (error) {
    console.error("❌ Error fetching suppliers:", error);
    res.status(500).json({ error: "Failed to fetch suppliers" });
  }
};

// Get a single supplier by ID
exports.getSupplierById = async (req, res) => {
  const supplierId = req.params.id;

  try {
    const [supplier] = await pool.query("SELECT * FROM Supplier WHERE Supplier_ID = ?", [supplierId]);

    if (supplier.length === 0) {
      return res.status(404).json({ error: "❌ Supplier not found!" });
    }

    res.json(supplier[0]);
  } catch (error) {
    console.error("❌ Error fetching supplier:", error);
    res.status(500).json({ error: "Failed to fetch supplier" });
  }
};

// Update a supplier
exports.updateSupplier = async (req, res) => {
  const supplierId = req.params.id;
  const { Name, Contact, Address } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE Supplier SET Name = ?, Contact = ?, Address = ? WHERE Supplier_ID = ?",
      [Name, Contact, Address, supplierId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "❌ Supplier not found!" });
    }

    res.json({ message: "✅ Supplier updated successfully!" });
  } catch (error) {
    console.error("❌ Error updating supplier:", error);
    res.status(500).json({ error: "Failed to update supplier" });
  }
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
  const supplierId = req.params.id;

  try {
    const [result] = await pool.query("DELETE FROM Supplier WHERE Supplier_ID = ?", [supplierId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "❌ Supplier not found!" });
    }

    res.json({ message: "✅ Supplier deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting supplier:", error);
    res.status(500).json({ error: "Failed to delete supplier" });
  }
};
