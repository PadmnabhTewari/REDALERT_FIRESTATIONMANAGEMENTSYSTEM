const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, vehicleController.getVehicles);
router.post('/', authMiddleware, vehicleController.createVehicle);

module.exports = router;