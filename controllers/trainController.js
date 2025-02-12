const Train = require('../models/trainModel');

exports.addTrain = async (req, res) => {
    try {
        const { name, source, destination, departureTime, totalSeats } = req.body;
        const train = await Train.create({ name, source, destination, departureTime, totalSeats, availableSeats: totalSeats });
        res.status(201).json(train);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTrains = async (req, res) => {
    try {
        const { source, destination } = req.query;
        const trains = await Train.findAll({ where: { source, destination } });
        res.json(trains);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addTrainSeats = async (req, res) => {
    try {
        const { trainId } = req.params;
        const { totalSeats } = req.body;

        // Validate input
        if (!totalSeats || totalSeats < 0) {
            return res.status(400).json({ error: 'Total seats must be a positive number' });
        }

        // Find train and update seats
        const train = await Train.findByPk(trainId);
        if (!train) {
            return res.status(404).json({ error: 'Train not found' });
        }

        train.totalSeats += totalSeats;
        train.availableSeats += totalSeats;
        await train.save();

        res.json({ message: 'Train seats updated successfully', train });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};