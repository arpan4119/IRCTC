const Booking = require('../models/bookingModel');

async function generateSeatNumber(trainId) {
  try {
    const lastBooking = await Booking.findOne({
        where: { trainId },
        order: [['seatNumber', 'DESC']], // Get the highest seat number
    });

    // If no previous booking, start from 1, else assign the next seat
    const seatNumber = lastBooking ? lastBooking.seatNumber + 1 : 1;

    return seatNumber;
  } catch (error) {
    console.error("Error fetching train details:", error);
    return null;
  }
}

module.exports = generateSeatNumber;