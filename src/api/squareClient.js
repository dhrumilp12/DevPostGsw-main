require('dotenv').config();
const { Client, Environment } = require('square');


const squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: process.env.SQUARE_ENVIRONMENT === 'sandbox' ? Environment.Sandbox : Environment.Production

});


module.exports = { 
    squareClient,
    paymentsApi: squareClient.paymentsApi,
    bookingApi: squareClient.bookingsApi,
    customersApi: squareClient.customersApi,
    inventoryApi: squareClient.inventoryApi, 
    catalogApi: squareClient.catalogApi,
    
};