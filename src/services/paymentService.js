const { paymentsApi } = require('../api/squareClient');
const crypto = require('crypto');



async function processPayment(nonce, amount) {
    try {
        const response = await paymentsApi.createPayment({
            sourceId: nonce,
            amountMoney: {
                amount: amount,
                currency: 'USD'
            },
            idemopotencyKey: crypto.randomUUID(),
        });

        if (!response || !response.result) {
            throw new Error("API call did not return expected result");
        }

        return response.result.payment;
    } catch (error) {
        console.log("Failed to process payment:", error);
        throw new Error("Failed to process payment");
    }
}

module.exports = { processPayment };