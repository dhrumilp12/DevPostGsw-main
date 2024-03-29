const express = require('express');
const paymentRoutes = require('./src/api/paymentRoutes');
const customerRoutes = require('./src/api/customerRoutes');
const bookingRoutes = require('./src/api/bookingRoutes');
const inventoryRoutes = require('./src/api/inventoryRoutes'); 
const { anyOf } = require('@apimatic/schema');
const cors = require('cors');
const app = express();
app.use(cors());


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.use(express.json());
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/inventory', inventoryRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;