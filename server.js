// Main server configuration file for setting up middleware, routes, and starting the server.

// Load environment configurations and required modules.
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
const teamRoutes=require('./src/api/teamRoutes')
const locationRoutes=require('./src/api/locationRoutes')
const path = require('path');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

// Enable Cross-Origin Resource Sharing (CORS).
app.use(cors());


// Session middleware for handling browser sessions with cookie settings.
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key_here',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));
 

// Initialize Passport for OAuth and session management.
app.use(passport.initialize());
app.use(passport.session());

// Use morgan for logging HTTP requests.
app.use(morgan('combined'));

// Parse incoming request bodies as JSON.
app.use(bodyParser.json());

// Handle JSON parsing errors gracefully.
app.use((err, req, res, next) => {
    if (req.method === "POST" || req.method === "PUT") {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            console.error('JSON parsing error:', err);
            return res.status(400).json({ error: 'Bad JSON format' });
        }
    }
    next(err);
});

  
// Register API routes for various functionalities.
app.use(express.json());
app.use('/api/catalogs', catalogRoutes);
app.use('/api/payments',paymentRoutes);
app.use('/api/bookings',  bookingRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/inventory',  inventoryRoutes);
app.use('/api/loyalty', loyaltyRoutes); 
app.use('/api/teams', teamRoutes);
app.use('/api/location',locationRoutes)
app.use('/uploads', express.static(path.join(__dirname, './src/uploads')));


// Serve static files from the React application in production.
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'my-square-app/build')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'my-square-app/build', 'index.html'));
    });
}

// Start the server on the configured port.
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export the configured Express app for potential further use.
module.exports = app;
