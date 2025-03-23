const Supplier = require('../models/Supplier');

exports.createSupplier = async (req, res) => {
  try {
    const supplierId = await Supplier.create(req.body);
    res.status(201).json({ id: supplierId, message: 'Supplier added successfully!' });
  } catch (error) {
    console.error('❌ Error creating supplier:', error);
    res.status(500).json({ message: 'Error creating supplier' });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    console.error('❌ Error fetching suppliers:', error);
    res.status(500).json({ message: 'Error fetching suppliers' });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json(supplier);
  } catch (error) {
    console.error('❌ Error fetching supplier:', error);
    res.status(500).json({ message: 'Error fetching supplier' });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    await Supplier.update(req.params.id, req.body);
    res.json({ message: 'Supplier updated successfully!' });
  } catch (error) {
    console.error('❌ Error updating supplier:', error);
    res.status(500).json({ message: 'Error updating supplier' });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.delete(req.params.id);
    res.json({ message: 'Supplier deleted successfully!' });
  } catch (error) {
    console.error('❌ Error deleting supplier:', error);
    res.status(500).json({ message: 'Error deleting supplier' });
  }
};
