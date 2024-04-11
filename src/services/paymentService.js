const { paymentsApi } = require('../api/squareClient');
const crypto = require('crypto');


async function processPayment(sourceId, amount, currency = 'USD', idempotencyKey = crypto.randomUUID()) {
  const requestBody = {
      sourceId: sourceId,
      amountMoney: {
          amount: amount,
          currency: currency
      },
      idempotencyKey: idempotencyKey,
  };

  // Add cash_details if the sourceId is CASH
  if (sourceId === 'CASH') {
      requestBody.cash_details = {
          buyer_supplied_money: {
              amount: amount,
              currency: currency
          }
      };
  }

  console.log('Request body to Square:', JSON.stringify(requestBody, null, 2));

  try {
      const response = await paymentsApi.createPayment(requestBody);

      console.log('Square API response status:', response.statusCode);

      if (!response || !response.result || !response.result.payment) {
          throw new Error("API call did not return expected result");
      }

      // Convert all BigInt properties to strings to ensure proper JSON serialization
      const paymentResult = JSON.parse(JSON.stringify(response.result.payment, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
      ));
      
      return paymentResult;
  } catch (error) {
      console.error("Full error details:", error);
      throw error;
  }
}


/**
 * Validates and formats a date string to an RFC 3339 format required by Square API.
 * If the input is invalid, a default date string is returned.
 * @param {string} dateStr - The date string to validate and format.
 * @param {boolean} [startOfDay=false] - True to set the time to the start of the day.
 * @returns {string} - The validated and formatted date string.
 */
function validateAndFormatDate(dateStr, startOfDay = false) {
  if (dateStr) {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      if (startOfDay) {
        date.setUTCHours(0, 0, 0, 0);
      }
      return date.toISOString();
    }
  }
  return null; // Return null for an invalid or absent date string
}


async function listPayments(queryParams) {
  try {
    // Validate and format dates
    const beginTime = validateAndFormatDate(queryParams.beginTime, true);
    const endTime = validateAndFormatDate(queryParams.endTime);

    // Prepare the API call parameters
    const params = {};
    if (beginTime) params.beginTime = beginTime;
    if (endTime) params.endTime = endTime;
    if (queryParams.sortOrder) params.sortOrder = queryParams.sortOrder;
    if (queryParams.cursor) params.cursor = queryParams.cursor;
    if (queryParams.locationId) params.locationId = queryParams.locationId;
    if (queryParams.limit) params.limit = queryParams.limit;

    console.log("Request Params:", params);
    const response = await paymentsApi.listPayments(params.beginTime, params.endTime, params.sortOrder, params.cursor, params.locationId, params.limit);

    if (!response || !response.result || !response.result.payments) {
      throw new Error("API call to list payments did not return expected result");
    }

    // Convert BigInt to strings if necessary
    return response.result.payments.map(payment => {
      return JSON.parse(JSON.stringify(payment, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
    });
  } catch (error) {
    console.error("Failed to list payments:", error);
    throw error;
  }
}


async function getPaymentDetails(paymentId) {
    try {
      const response = await paymentsApi.getPayment(paymentId);
      if (!response || !response.result) {
        throw new Error("API call did not return expected result");
      }
  
      // If the response contains a BigInt value, you will need to serialize it.
      const paymentDetails = response.result.payment;
      
      // Handling BigInt serialization, if necessary
      const paymentDetailsWithSerializedBigInts = JSON.parse(JSON.stringify(paymentDetails, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
  
      return paymentDetailsWithSerializedBigInts;
    } catch (error) {
      console.error("Error in getPaymentDetails:", error.message);
      throw error;
    }
  }
  


module.exports = { processPayment, listPayments,getPaymentDetails };