const { paymentsApi } = require('../api/squareClient');
const crypto = require('crypto');



async function processPayment(nonce, amount) {
    if (amount <= 0) {
        throw new Error('Invalid payment amount'); // Throw an error for invalid amount
    }

    try {
        const response = await paymentsApi.createPayment({
            sourceId: nonce,
            amountMoney: {
                amount: amount,
                currency: 'USD'
            },
            idempotencyKey: crypto.randomUUID(),
        });

        if (!response || !response.result) {
            throw new Error("API call did not return expected result");
        }

        return response.result.payment;
    } catch (error) {
        console.log("Error in processPayment:", error.message); // Additional logging
        throw error; // Re-throw the error
    }
}

async function refundPayment(paymentId, amountMoney) {
    try {
        const response = await paymentsApi.refundPayment({
            idempotencyKey: crypto.randomUUID(),
            paymentId: paymentId,
            amountMoney: amountMoney
        });

        if (!response || !response.result) {
            throw new Error("API call to refund payment did not return expected result");
        }

        return response.result.refund;
    } catch (error) {
        console.log("Failed to refund payment:", error);
        throw new Error("Failed to refund payment");
    }
}

async function listPayments(customerId) {
    try {
        const response = await paymentsApi.listPayments({
            customerId: customerId
        });

        if (!response || !response.result) {
            throw new Error("API call to list payments did not return expected result");
        }

        return response.result.payments;
    } catch (error) {
        console.log("Failed to list payments:", error);
        throw new Error("Failed to list payments");
    }
}


module.exports = { processPayment, refundPayment, listPayments };