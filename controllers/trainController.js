const { Train } = require('../models/trainModel');

exports.addTrain = async (req, res) => {
    try {
        const { name, source, destination, totalSeats } = req.body;
        const train = await Train.create({ name, source, destination, totalSeats, availableSeats: totalSeats });
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