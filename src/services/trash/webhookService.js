const { webhookApi } = require('../api/squareClient');
 
const processWebhook = (data) => {
    // Here you can add logic to handle different types of Square webhook events
    // For example:
    if (data.type === 'order.created') {
        console.log('Order created:', data.data.object);
    } else if (data.type === 'payment.created') {
        console.log('Payment created:', data.data.object);
    }
    // Add more event types as needed
};
 
module.exports = { processWebhook };