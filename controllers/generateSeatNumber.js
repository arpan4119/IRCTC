const Train = require('../models/trainModel');

async function generateSeatNumber(trainId) {
  try {
    // Fetch train details using trainId
    const train = await Train.findOne({ where: { id: trainId } });

    if (!train) {
      console.log("Train not found!");
      return null;
    }

    // Calculate seat number
    const seatNumber = train.totalSeats - train.availableSeats + 1;
    return seatNumber;
  } catch (error) {
    console.error("Error fetching train details:", error);
    return null;
  }
}

module.exports = generateSeatNumber;