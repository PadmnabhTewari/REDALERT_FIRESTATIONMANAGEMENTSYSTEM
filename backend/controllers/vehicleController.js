const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (req, res) => {
  try {
    const vehicleId = await Vehicle.create(req.body);
    res.status(201).json({ id: vehicleId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle' });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles' });
  }
};