const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { authenticateToken, authorizeRole } = require('./middleware/authMiddleware');

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('IRCTC Railway Management System API is Running 🚆');
});

// Connect to the database
sequelize.authenticate().then(() => {
    console.log('Database connected successfully');
}).catch(err => console.error('Unable to connect to the database:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', authenticateToken, bookingRoutes);

// Start Server
const port = process.env.PORT || 5000;
sequelize.sync().then(() => {
    app.listen(port, () => console.log('Server running on port:', port));
}).catch(err => console.log(err));