jest.mock('../../src/api/squareClient'); // Ensure the path is correct relative to this test file

const { createCustomer, getCustomerDetails, updateCustomer, listCustomers } = require('../../src/services/customerService');
const { customersApi } = require('../../src/api/squareClient');

describe('Customer Service', () => {
  // Define a mock customer to use in your tests
  const mockCustomer = { id: 'c123', name: 'John Doe', email: 'john.doe@example.com' };
  
  beforeEach(() => {
    

    // Setup mock implementations for the customersApi
    customersApi.createCustomer.mockResolvedValue({ customer: mockCustomer });
    customersApi.retrieveCustomer.mockResolvedValue({ customer: mockCustomer });
    customersApi.updateCustomer.mockResolvedValue({ customer: { ...mockCustomer, email: 'newemail@example.com' } });
    customersApi.listCustomers.mockResolvedValue({ customers: [mockCustomer] });
  });

  it('creates a customer successfully', async () => {
    const customerData = { name: 'John Doe', email: 'john.doe@example.com' };
    const result = await createCustomer(customerData);

    expect(result).toHaveProperty('id', mockCustomer.id);
    expect(customersApi.createCustomer).toHaveBeenCalledWith(customerData);
  });

  it('retrieves customer details successfully', async () => {
    const result = await getCustomerDetails(mockCustomer.id);

    expect(result).toHaveProperty('id', mockCustomer.id);
    expect(customersApi.retrieveCustomer).toHaveBeenCalledWith(mockCustomer.id);
  });

  it('updates customer details successfully', async () => {
    const updatedData = { email: 'newemail@example.com' };
    const result = await updateCustomer(mockCustomer.id, updatedData);

    expect(result).toHaveProperty('id', mockCustomer.id);
    expect(result).toHaveProperty('email', updatedData.email);
    expect(customersApi.updateCustomer).toHaveBeenCalledWith(mockCustomer.id, updatedData);
  });

  it('lists all customers successfully', async () => {
    const result = await listCustomers();

    expect(Array.isArray(result)).toBeTruthy();
    expect(result[0]).toHaveProperty('id', mockCustomer.id);
    expect(customersApi.listCustomers).toHaveBeenCalled();
  });
});
