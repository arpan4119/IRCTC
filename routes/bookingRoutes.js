const express = require('express');
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const router = express.Router();

router.post('/book', bookSeat);
router.get('/:id', getBookingDetails);

module.exports = router;
