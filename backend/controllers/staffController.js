const Staff = require('../models/Staff');

exports.getStaff = async (req, res) => {
  const staff = await Staff.findAll();
  res.json(staff);
};

exports.createStaff = async (req, res) => {
  const staff = await Staff.create(req.body);
  res.status(201).json(staff);
};