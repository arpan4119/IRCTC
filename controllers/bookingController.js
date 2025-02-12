const { Booking, Train } = require('../models/bookingModel');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const redisClient = require('../config/redis');

exports.bookSeat = async (req, res) => {
    const { trainId, userId } = req.body;
    try {
        const result = await sequelize.transaction(async (t) => {
            // Use atomic SQL query to avoid race conditions
            const updatedTrain = await Train.update(
                { availableSeats: Sequelize.literal('availableSeats - 1') },
                { 
                    where: { id: trainId, availableSeats: { [Sequelize.Op.gt]: 0 } }, // Ensure seat availability
                    returning: true,
                    transaction: t
                }
            );

            if (updatedTrain[1].length === 0) {
                throw new Error('No seats available');
            }

            // Create booking
            const booking = await Booking.create({ trainId, userId }, { transaction: t });

            // Invalidate Redis cache
            await redisClient.del(`train_${trainId}`);

            return booking;
        });

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getBookingDetails = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
