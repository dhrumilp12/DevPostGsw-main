const { Client, Environment } = require('square');

const squareCLient = new Client({
    accesstoken: process.env.SQUARE_ACCESS_TOKEN,
    environment: process.env.SQUARE_ENVIRONMENT === 'sandbox' ? Environment.Sandbox : Environment.Production
});

module.exports = { 
    squareCLient,
    paymentsApi: squareCLient.paymentsApi,
};