const { loyaltyApi } = require('../api/squareClient');

async function createLoyaltyAccount(accountData) {
    try {
        const response = await loyaltyApi.createLoyaltyAccount({ loyaltyAccount: accountData });
        return response.result.loyaltyAccount;
    } catch (error) {
        console.error("Failed to create loyalty account:", error);
        throw new Error("Failed to create loyalty account");
    }
}

async function searchLoyaltyAccounts(searchCriteria) {
    try {
        const response = await loyaltyApi.searchLoyaltyAccounts({ query: searchCriteria });
        return response.result.loyaltyAccounts;
    } catch (error) {
        console.error("Failed to search loyalty accounts:", error);
        throw new Error("Failed to search loyalty accounts");
    }
}

async function retrieveLoyaltyAccount(accountId) {
    try {
        const response = await loyaltyApi.retrieveLoyaltyAccount(accountId);
        return response.result.loyaltyAccount;
    } catch (error) {
        console.error("Failed to retrieve loyalty account:", error);
        throw new Error("Failed to retrieve loyalty account");
    }
}

async function accumulateLoyaltyPoints(accountId, accumulateData) {
    try {
        const response = await loyaltyApi.accumulateLoyaltyPoints(accountId, { accumulatePoints: accumulateData });
        return response.result.loyaltyEvent;
    } catch (error) {
        console.error("Failed to accumulate loyalty points:", error);
        throw new Error("Failed to accumulate loyalty points");
    }
}

async function adjustLoyaltyPoints(accountId, adjustData) {
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
