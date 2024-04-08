import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchLoyaltyAccounts } from '../../Actions/loyaltyApiAction/searchLoyaltyAccountAction';
import { Form, Button, Alert } from 'react-bootstrap';

const SearchLoyaltyAccountsForm = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    phoneNumber: '',
    customerId: '',
  });
  const dispatch = useDispatch();
  const { loading, accounts, error } = useSelector((state) => state.loyaltyAccountsSearch);

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = {};

    if (searchCriteria.phoneNumber) {
      query.mapping = { phoneNumber: searchCriteria.phoneNumber };
    } else if (searchCriteria.customerId) {
      query.customerIds = [searchCriteria.customerId];
    }

    dispatch(searchLoyaltyAccounts({ query }));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={searchCriteria.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Customer ID</Form.Label>
          <Form.Control
            type="text"
            name="customerId"
            value={searchCriteria.customerId}
            onChange={handleChange}
            placeholder="Enter customer ID"
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Searching...' : 'Search Accounts'}
        </Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {accounts && (
        <div className="mt-3">
          <h4>Search Results:</h4>
          {accounts.map((account, index) => (
            <div key={index}>
              <p>ID: {account.id}</p>
              <p>Phone Number: {account.mapping.phoneNumber}</p>
              <p>Balance: {account.balance}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchLoyaltyAccountsForm;
