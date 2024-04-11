require('dotenv').config();
const { Client, Environment } = require('square');

const isSandbox = process.env.SQUARE_ENVIRONMENT === 'sandbox';

const squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: isSandbox ? Environment.Sandbox : Environment.Production,
});

const bookingClient = new Client({
    accessToken: process.env.PRODUCTION_ACCESS_TOKEN,
    environment: Environment.Production,
});


module.exports = { 
    squareClient,
    paymentsApi: squareClient.paymentsApi,
    bookingApi: bookingClient.bookingsApi,
    customersApi: squareClient.customersApi,
    inventoryApi: squareClient.inventoryApi, 
    catalogApi: squareClient.catalogApi,
    loyaltyApi: squareClient.loyaltyApi,
    oauthApi: squareClient.oAuthApi,
    webhookApi: squareClient.webhookApi,
};