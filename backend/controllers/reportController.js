const Report = require('../models/Report');

exports.getReports = async (req, res) => {
  const reports = await Report.findAll();
  res.json(reports);
};

exports.createReport = async (req, res) => {
  const report = await Report.create(req.body);
  res.status(201).json(report);
};