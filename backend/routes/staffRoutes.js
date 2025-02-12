const express = require('express');
const staffController = require('../controllers/staffController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, staffController.getStaff);
router.post('/', authMiddleware, staffController.createStaff);

module.exports = router;