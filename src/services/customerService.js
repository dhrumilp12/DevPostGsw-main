const { customersApi } = require('../api/squareClient');

async function listCustomers(cursor) {
    try {
      const response = await customersApi.listCustomers(
        cursor || undefined
      );
      console.log("Square API response:", response); // Log the raw API response
      return response.result.customers || [];// Log the customers array
    } catch (error) {
      console.error("Failed to list customers:", error);
      throw error;
    }
  }
  
  async function getCustomerDetails(customerId) {
    try {
        const response = await customersApi.retrieveCustomer(customerId);

        if (response.errors) {
            throw new Error(response.errors[0].detail);
        }
        console.log('Full API URL:', 'https://connect.squareupsandbox.com/v2/customers/' + customerId);
        console.log('Customer ID:', customerId);

        if (!response.result.customer) {
            throw new Error('Customer not found.');
        }

        // Convert BigInt values to strings
        const customer = {
            ...response.result.customer,
            version: response.result.customer.version.toString()
        };

        return customer;
    } catch (error) {
        console.error("Failed to retrieve customer details:", error);
        throw error;
    }
}


  async function createCustomer(customerData) {
    try {
      console.log('Square Access Token used:', process.env.SQUARE_ACCESS_TOKEN);
      const response = await customersApi.createCustomer(customerData);
      if (response.errors) {
        // Throw the error with Square API's error detail for better debugging 
        throw new Error(response.errors[0].detail); 
      }
  
      return response.result.customer;
    } catch (error) {
      console.error('Failed to create customer:', error.message);
      // Re-throw the error to propagate it
      throw error; 
    }
  }
  
  
  async function updateCustomer(customerId, customerData) {
    try {
      console.log('Updating customer:', customerId, 'with data:', customerData);
      const response = await customersApi.updateCustomer(customerId, customerData);
  
      
  
      if (response.errors) {
        throw new Error(response.errors[0].detail);
      }
  
      if (!response.result.customer) {
        throw new Error('Customer not found.');
      }
  
      // Convert BigInt values to strings
      const updatedCustomer = {
        ...response.result.customer,
        version: response.result.customer.version.toString()
      };
  
      return updatedCustomer;
    } catch (error) {
      console.error("Failed to update customer:", error.message);
      throw error;
    }
  }

  async function authenticateCustomer(email, password) {
    try {
      const customer = await customersApi.authenticateCustomer(email, password);
      if (!customer) {
        throw new Error('Customer not found.');
      }
      
      const match = await bcrypt.compare(password, customer.hashedPassword);
      if (!match) {
        throw new Error('Invalid password.');
      }

      const { hashedPassword, ...customerWithoutPassword } = customer;
      return customerWithoutPassword;
    } catch (error) {
        console.error("Failed to authenticate customer:", error);
        throw error;
      }
    }
  
  
  
  module.exports = {
    listCustomers,
    getCustomerDetails,
    createCustomer,
    updateCustomer,
    authenticateCustomer
  };
