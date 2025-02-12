const FireStation = require('../models/FireStation');

exports.createFireStation = async (req, res) => {
  try {
    const stationId = await FireStation.create(req.body);
    res.status(201).json({ id: stationId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating fire station' });
  }
};

exports.getFireStations = async (req, res) => {
  try {
    const stations = await FireStation.findAll();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fire stations' });
  }
};