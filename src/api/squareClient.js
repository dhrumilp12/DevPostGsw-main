require('dotenv').config();
const { Client, Environment } = require('square');

// Check if the environment is set to production
const isProduction = process.env.SQUARE_ENVIRONMENT === 'production';

const squareClient = new Client({
    accessToken: process.env.PRODUCTION_ACCESS_TOKEN,
    environment: isProduction ? Environment.Production : Environment.Sandbox,
});

module.exports = { 
    squareClient,
    paymentsApi: squareClient.paymentsApi,
    bookingApi: squareClient.bookingsApi,
    customersApi: squareClient.customersApi,
    inventoryApi: squareClient.inventoryApi, 
    catalogApi: squareClient.catalogApi,
    loyaltyApi: squareClient.loyaltyApi,
    oauthApi: squareClient.oAuthApi,
    webhookApi: squareClient.webhookApi,
};
