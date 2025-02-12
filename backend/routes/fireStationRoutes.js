const express = require('express');
const fireStationController = require('../controllers/fireStationController');

const router = express.Router();

router.post('/', fireStationController.createFireStation);
router.get('/', fireStationController.getFireStations);

module.exports = router;