const Vehicle = require('../models/Vehicle');

exports.getVehicles = async (req, res) => {
  const vehicles = await Vehicle.findAll();
  res.json(vehicles);
};

exports.createVehicle = async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  res.status(201).json(vehicle);
};