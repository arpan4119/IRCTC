const { Booking, Train } = require('../models');
const { Sequelize } = require('sequelize');

exports.bookSeat = async (req, res) => {
    const { trainId, userId } = req.body;
    try {
        const train = await Train.findByPk(trainId);
        if (!train || train.availableSeats <= 0) {
            return res.status(400).json({ message: 'No seats available' });
        }
        await sequelize.transaction(async (t) => {
            const updatedTrain = await Train.findByPk(trainId, { lock: t.LOCK.UPDATE, transaction: t });
            if (updatedTrain.availableSeats > 0) {
                await updatedTrain.update({ availableSeats: updatedTrain.availableSeats - 1 }, { transaction: t });
                const booking = await Booking.create({ trainId, userId }, { transaction: t });
                res.status(201).json(booking);
            } else {
                res.status(400).json({ message: 'No seats available' });
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
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