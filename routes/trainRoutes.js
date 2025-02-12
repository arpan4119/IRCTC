const express = require('express');
const { addTrain, getTrains } = require('../controllers/trainController');
const { authenticateToken, authorizeRole, verifyAdminApiKey } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authenticateToken, authorizeRole('admin'), verifyAdminApiKey, addTrain);
router.get('/', getTrains);

module.exports = router;
