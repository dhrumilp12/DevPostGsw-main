const express = require('express');
const paymentRoutes = require('./src/api/paymentRoutes');
const { anyOf } = require('@apimatic/schema');

const app = express();
app.use(express());
app.use('/api/payments', paymentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;