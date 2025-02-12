const express = require('express');
const { addTrain, getTrains, addTrainSeats } = require('../controllers/trainController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authenticateToken, authorizeRole('admin'), addTrain);
router.get('/', getTrains);
router.put('/add-seats/:trainId', authenticateToken, authorizeRole('admin'), addTrainSeats);

module.exports = router;
