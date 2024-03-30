require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./auth/authMiddleware'); 
const paymentRoutes = require('./src/api/paymentRoutes');
const customerRoutes = require('./src/api/customerRoutes');
const bookingRoutes = require('./src/api/bookingRoutes');
const inventoryRoutes = require('./src/api/inventoryRoutes'); 
const cors = require('cors');
const app = express();
const morgan = require('morgan');


// Very simplified signup (No password hashing for demonstration)
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // In reality, store these in a database securely!
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.json({ token });
});

// Simplified login (No password comparison for demonstration)
app.post('/login', (req, res) => {
    const { username } = req.body;
    // In reality, retrieve and compare with the stored user data 
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.json({ token });
});
app.use(cors());


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.use(express.json());
app.use('/api/payments', authMiddleware,paymentRoutes);
app.use('/api/bookings', authMiddleware, bookingRoutes);
app.use('/api/customers', authMiddleware, customerRoutes);
app.use('/api/inventory', authMiddleware, inventoryRoutes);
app.use(morgan('combined'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;