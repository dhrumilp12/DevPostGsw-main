// loyaltyService.js contains functions to manage loyalty accounts and points, interacting with external loyalty systems.
const { loyaltyApi } = require('../api/squareClient');


// Creates a loyalty account using the provided account data.
async function createLoyaltyAccount(accountData) {
   // Sends a request to the API to create a new loyalty account and handles the response.
    try {
        const response = await loyaltyApi.createLoyaltyAccount({ loyaltyAccount: accountData });
        return response.result.loyaltyAccount;
    } catch (error) {
        console.error("Failed to create loyalty account:", error);
        throw new Error("Failed to create loyalty account");
    }
}


// Searches for loyalty accounts based on provided criteria.
async function searchLoyaltyAccounts(searchCriteria) {
    // Uses search criteria to find matching loyalty accounts, handling API responses and errors.
    try {
        const response = await loyaltyApi.searchLoyaltyAccounts({ query: searchCriteria });
        return response.result.loyaltyAccounts;
    } catch (error) {
        console.error("Failed to search loyalty accounts:", error);
        throw new Error("Failed to search loyalty accounts");
    }
}


// Retrieves a specific loyalty account by its account ID.
async function retrieveLoyaltyAccount(accountId) {
    // Fetches detailed information about a specific loyalty account from the API.
    try {
        const response = await loyaltyApi.retrieveLoyaltyAccount(accountId);
        return response.result.loyaltyAccount;
    } catch (error) {
        console.error("Failed to retrieve loyalty account:", error);
        throw new Error("Failed to retrieve loyalty account");
    }
}


// Accumulates loyalty points on an account.
async function accumulateLoyaltyPoints(accountId, accumulateData) {
   // Sends data to the API to add points to a loyalty account and handles the resulting loyalty event.
    try {
        const response = await loyaltyApi.accumulateLoyaltyPoints(accountId, { accumulatePoints: accumulateData });
        return response.result.loyaltyEvent;
    } catch (error) {
        console.error("Failed to accumulate loyalty points:", error);
        throw new Error("Failed to accumulate loyalty points");
    }
}


// Adjusts loyalty points on an account, either adding or subtracting.
async function adjustLoyaltyPoints(accountId, adjustData) {
    // Modifies the point balance on a loyalty account and manages the API response and potential errors.
    try {
        const response = await loyaltyApi.adjustLoyaltyPoints(accountId, { adjustPoints: adjustData });
        return response.result.loyaltyEvent;
    } catch (error) {
        console.error("Failed to adjust loyalty points:", error);
        throw new Error("Failed to adjust loyalty points");
    }
}

// Add other functions based on the Loyalty API endpoints

module.exports = {
    createLoyaltyAccount,
    searchLoyaltyAccounts,
    retrieveLoyaltyAccount,
    accumulateLoyaltyPoints,
    adjustLoyaltyPoints
    // Add other exported functions
};
