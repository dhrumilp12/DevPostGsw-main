require('dotenv').config();
const { Client, Environment } = require('square');
const axios = require('axios');

// Check if the environment is set to production
const isProduction = process.env.SQUARE_ENVIRONMENT === 'production';
const accessToken = process.env.PRODUCTION_ACCESS_TOKEN;
const squareClient = new Client({
    accessToken: accessToken,
    
    environment: isProduction ? Environment.Production : Environment.Sandbox,
});
if (!accessToken) {
    console.error('Access Token is undefined');
  }

const axiosInstance = axios.create({
  baseURL: 'https://connect.squareup.com',
  headers: {
      'Authorization': `Bearer ${process.env.PRODUCTION_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
});
  
  
module.exports = { 
    axiosInstance,
    squareClient,
    locationApi: squareClient.locationsApi,
    teamApi : squareClient.teamApi,
    paymentsApi: squareClient.paymentsApi,
    bookingApi: squareClient.bookingsApi,
    customersApi: squareClient.customersApi,
    inventoryApi: squareClient.inventoryApi, 
    catalogApi: squareClient.catalogApi,
    loyaltyApi: squareClient.loyaltyApi,
    oauthApi: squareClient.oAuthApi,
    webhookApi: squareClient.webhookApi,
};
