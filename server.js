const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('IRCTC Railway Management System API is Running 🚆');
});

app.use('/api/auth', authRoutes);
app.use('/api/trains', authenticateToken, authorizeRole('admin'), trainRoutes);
app.use('/api/bookings', authenticateToken, bookingRoutes);

const PORT = process.env.PORT || 5000;
// Start Server
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port:`, PORT));
}).catch(err => console.log(err));

app.use('/auth', authRoutes);

