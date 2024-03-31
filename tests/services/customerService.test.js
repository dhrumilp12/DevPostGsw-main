jest.mock('../../src/api/squareClient');

const { createCustomer, getCustomerDetails, updateCustomer, listCustomers } = require('../../src/services/customerService');
const { customersApi } = require('../../src/api/squareClient');

describe('Customer Service', () => {
  const mockCustomer = {
    id: 'c123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    version: 0n
  };

  beforeEach(() => {
    jest.clearAllMocks();
    customersApi.createCustomer.mockResolvedValue({
      result: { customer: { ...mockCustomer, version: mockCustomer.version.toString() } } // Convert BigInt to string
    });
    customersApi.retrieveCustomer.mockResolvedValue({ result: { customer: mockCustomer } });
    customersApi.updateCustomer.mockResolvedValue({ result: { customer: { ...mockCustomer, email: 'newemail@example.com' } } });
    customersApi.listCustomers.mockResolvedValue({ result: { customers: [{ ...mockCustomer, version: mockCustomer.version.toString() }] } });
  });
  

  it('creates a customer successfully', async () => {
    const customerData = { name: 'John Doe', email: 'john.doe@example.com' };
    const result = await createCustomer(customerData);

    expect(result).toHaveProperty('id', mockCustomer.id);
    expect(result).toHaveProperty('version', mockCustomer.version.toString());
    expect(customersApi.createCustomer).toHaveBeenCalledWith(customerData);
  });

  it('retrieves customer details successfully', async () => {
    const result = await getCustomerDetails(mockCustomer.id);

    expect(result).toHaveProperty('id', mockCustomer.id);
    expect(result).toHaveProperty('version', mockCustomer.version.toString());
    expect(customersApi.retrieveCustomer).toHaveBeenCalledWith(mockCustomer.id);
  });

  it('updates customer details successfully', async () => {
    const updatedData = { email: 'newemail@example.com' };
    const result = await updateCustomer(mockCustomer.id, updatedData);

    expect(result).toHaveProperty('id', mockCustomer.id);
    expect(result).toHaveProperty('email', updatedData.email);
    expect(result).toHaveProperty('version', mockCustomer.version.toString());
    expect(customersApi.updateCustomer).toHaveBeenCalledWith(mockCustomer.id, updatedData);
  });

  it('lists all customers successfully', async () => {
    const result = await listCustomers();

    expect(Array.isArray(result)).toBeTruthy();
    expect(result[0]).toHaveProperty('id', mockCustomer.id);
    expect(result[0]).toHaveProperty('version', mockCustomer.version.toString());
    expect(customersApi.listCustomers).toHaveBeenCalled();
  });
});
