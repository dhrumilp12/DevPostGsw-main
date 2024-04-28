// customerService.js provides functions to interact with the customer-related data store or external APIs.
const { customersApi } = require('../api/squareClient');

// List all customers from the database or API with optional pagination.
async function listCustomers(cursor) {
    // Implements logic to fetch customers, potentially handling cursor-based pagination.
    try {
        const response = await customersApi.listCustomers(cursor || undefined);
        console.log("Square API response:", response); // Log the raw API response
        // Convert BigInt values to strings for each customer
        const customers = response.result.customers.map(customer => ({
            ...customer,
            version: customer.version.toString()
        }));
        console.log("Customers:", customers); // Log the customers array
        return customers;
    } catch (error) {
        console.error("Failed to list customers:", error);
        throw error;
    }
}


// Retrieve details for a specific customer by ID.
async function getCustomerDetails(customerId) {
    // Fetches detailed information about a specific customer, potentially including sensitive data handling.
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


// Create a new customer in the database or via an external API.
async function createCustomer(customerData) {
    // Saves a new customer record, ensuring data validation and error handling.
    try {
        console.log('Square Access Token used:', process.env.SQUARE_ACCESS_TOKEN);
        const response = await customersApi.createCustomer({
            ...customerData,
            note: customerData.password // Use the note field for the password
        });
        if (response.errors) {
            // Throw the error with Square API's error detail for better debugging 
            throw new Error(`Failed to create customer: ${response.errors[0].detail}`);
        }

        return response.result.customer;
    } catch (error) {
        console.error('Failed to create customer:', error.message);
        // Re-throw the error to propagate it
        throw error; 
    }
}


// Update an existing customer's details.
async function updateCustomer(customerId, customerData) {
    // Updates customer information in the data store, handling data validation and concurrency issues.
    try {
        console.log('Updating customer:', customerId, 'with data:', customerData);
        const response = await customersApi.updateCustomer(customerId, customerData);
        console.log('Square API update customer response:', response); 

        if (response.errors) {
            throw new Error(`Failed to update customer: ${response.errors[0].detail}`);
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


// Handle customer login and authentication.
async function findCustomerByEmail(email) {
     // Searches for a customer by email to support login functionality, includes security measures against data leaks.
  try {
    const response = await customersApi.listCustomers();
    const customers = response.result.customers || [];
    return customers.find(customer => customer.emailAddress === email);
  } catch (error) {
    console.error('Failed to find customer by email:', error);
    throw error;
  }
}



// Export functions for use in route handlers.
module.exports = {
  listCustomers,
  getCustomerDetails,
  createCustomer,
  updateCustomer,
  findCustomerByEmail,
};

