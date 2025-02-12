const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

// Example route to fetch dashboard data
router.get('/', authMiddleware, dashboardController.getDashboardData);

module.exports = router;