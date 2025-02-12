const express = require('express');
const reportController = require('../controllers/reportController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, reportController.getReports);
router.post('/', authMiddleware, reportController.createReport);

module.exports = router;