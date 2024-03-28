const { customersApi } = require('../api/squareClient');

async function listCustomers(cursor) {
    try {
      const response = await customersApi.listCustomers({
        cursor: cursor
      });
      return response.customers || [];
    } catch (error) {
      console.error("Failed to list customers:", error);
      throw error;
    }
  }
  
  async function getCustomerDetails(customerId) {
    try {
      const response = await customersApi.retrieveCustomer(customerId);
      return response.customer;
    } catch (error) {
      console.error("Failed to retrieve customer details:", error);
      throw error;
    }
  }
  
  async function createCustomer(customerData) {
    try {
      const response = await customersApi.createCustomer(customerData);
      return response.customer;
    } catch (error) {
      console.error("Failed to create customer:", error);
      throw error;
    }
  }
  
  async function updateCustomer(customerId, customerData) {
    try {
      const response = await customersApi.updateCustomer(customerId, customerData);
      return response.customer;
    } catch (error) {
      console.error("Failed to update customer:", error);
      throw error;
    }
  }
  
  module.exports = {
    listCustomers,
    getCustomerDetails,
    createCustomer,
    updateCustomer
  };
