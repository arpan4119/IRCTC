const express = require('express');
const { addTrain, getTrains } = require('../controllers/trainController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authenticateToken, authorizeRole('admin'), addTrain);
router.get('/', getTrains);
router.put('/update-seats/:trainId', authenticateToken, authorizeRole('admin'), updateTrainSeats);

module.exports = router;
