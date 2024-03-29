const { customersApi } = require('../api/squareClient');

async function listCustomers(cursor) {
    try {
      const response = await customersApi.listCustomers(
        cursor || undefined
      );
      return response.customers || [];
    } catch (error) {
      console.error("Failed to list customers:", error);
      throw error;
    }
  }
  
  async function getCustomerDetails(customerId) {
    try {
      const response = await customersApi.retrieveCustomer(customerId);
  
      // Simulate error response from the API
      if (response.errors) {
        throw new Error(response.errors[0].detail);
      }
  
      return response.customer;
    } catch (error) {
      // Here, log the error and re-throw it if necessary
      console.error("Failed to retrieve customer details:", error.response?.data.errors[0].detail || error.message);
      
      // Throw an error that includes the API's error detail message
      throw new Error(error.response?.data.errors[0].detail || "Failed to retrieve customer details");
    }
  }
  
  
  async function createCustomer(customerData) {
    try {
      const response = await customersApi.createCustomer(customerData);
  
      if (response.errors) {
        throw new Error(response.errors[0].detail);
      }
  
      return response.customer;
    } catch (error) {
      console.error("Failed to create customer:", error.message);
      throw new Error("Failed to create customer");
    }
  }
  
  async function updateCustomer(customerId, customerData) {
    try {
      const response = await customersApi.updateCustomer(customerId, customerData);
  
      if (response.errors) {
        throw new Error(response.errors[0].detail);
      }
  
      if (!response.customer) {
        throw new Error('Customer not found.');
      }
  
      return response.customer;
    } catch (error) {
      console.error("Failed to update customer:", error.message);
      throw new Error("Failed to update customer");
    }
    
  }
  
  module.exports = {
    listCustomers,
    getCustomerDetails,
    createCustomer,
    updateCustomer,
  };
