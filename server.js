require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./src/api/authMiddlewareRoutes');
const paymentRoutes = require('./src/api/paymentRoutes');
const customerRoutes = require('./src/api/customerRoutes');
const bookingRoutes = require('./src/api/bookingRoutes');
const inventoryRoutes = require('./src/api/inventoryRoutes'); 
const catalogRoutes= require('./src/api/catalogRoutes'); 
const loyaltyRoutes = require('./src/api/loyaltyRoutes'); 
const path = require('path');
const cors = require('cors');
const app = express();
const morgan = require('morgan');



// Set up session handling
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key_here',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
 
// Initialize Passport and OAuth
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());

// Error handling for JSON parsing errors
app.use((err, req, res, next) => {
    if (req.method === "POST" || req.method === "PUT") {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            console.error('JSON parsing error:', err);
            return res.status(400).json({ error: 'Bad JSON format' });
        }
    }
    next(err);
});

  

app.use(express.json());
app.use('/api/catalogs', catalogRoutes);
app.use('/api/payments',paymentRoutes);
app.use('/api/bookings',  bookingRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/inventory',  inventoryRoutes);
app.use('/api/loyalty', loyaltyRoutes); 
app.use('/uploads', express.static(path.join(__dirname, './src/uploads')));

app.use(morgan('combined'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
