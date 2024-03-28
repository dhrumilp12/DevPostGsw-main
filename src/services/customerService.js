const { customersApi } = require('../api/squareClient');

async function createCustomer(customerData) {
    try {
        const response = await customersApi.createCustomer(customerData);

        if (!response || !response.result) {
            throw new Error("API call did not return expected result");
        }

        return response.result.customer;
    } catch (error) {
        console.log("Failed to create customer:", error);
        throw new Error("Failed to create customer");
    }
}

async function getCustomerDetails(customerId) {
    try {
        const response = await customersApi.retrieveCustomer(customerId);

        if (!response || !response.result) {
            throw new Error("API call did not return expected result");
        }

        return response.result.customer;
    } catch (error) {
        console.log("Failed to retrieve customer details:", error);
        throw new Error("Failed to retrieve customer details");
    }
}

// Add more customer-related functions as needed

module.exports = { createCustomer, getCustomerDetails };
