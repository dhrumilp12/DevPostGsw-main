// Configures the Square SDK client and axios instance for API calls.

// Load environment variables.
require('dotenv').config();

// Import necessary modules from the Square SDK and axios for HTTP requests.
const { Client, Environment } = require('square');
const axios = require('axios');

// Check the environment and set the appropriate Square environment.
const isProduction = process.env.SQUARE_ENVIRONMENT === 'production';
const accessToken = process.env.PRODUCTION_ACCESS_TOKEN;

// Initialize the Square client with the access token and environment settings.
const squareClient = new Client({
    accessToken: accessToken,
    
    environment: isProduction ? Environment.Production : Environment.Sandbox,
});
if (!accessToken) {
    console.error('Access Token is undefined');
  }

// Create a pre-configured axios instance for API requests.
const axiosInstance = axios.create({
  baseURL: 'https://connect.squareup.com',
  headers: {
      'Authorization': `Bearer ${process.env.PRODUCTION_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  }
});
  
// Export Square client, axios instance, and specific API clients for easy access.
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
