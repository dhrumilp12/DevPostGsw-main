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
const oauthRoutes= require('./src/api/oauthRoutes');
const webhookRoutes = require('./src/api/webhookRoutes');
const { setupOAuth } = require('./src/services/oauthService');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

// Set up OAuth
setupOAuth();

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


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.use(express.json());
app.use('/api/catalogs', catalogRoutes);
app.use('/api/payments', authMiddleware,paymentRoutes);
app.use('/api/bookings',  bookingRoutes);
app.use('/api/customers', authMiddleware,customerRoutes);
app.use('/api/inventory',  inventoryRoutes);
app.use('/api/loyalty', loyaltyRoutes); 
app.use('/api/oauthRoutes', oauthRoutes); 
app.use('/api/webhooks', webhookRoutes);

app.use(morgan('combined'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
