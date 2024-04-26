// RetrieveLoyaltyAccountForm provides a form to retrieve a loyalty account by its ID.
// Upon submission, it dispatches the retrieveLoyaltyAccount action and displays either the account details or an error message.

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveLoyaltyAccount } from '../../Actions/loyaltyApiAction/retrieveLoyaltyAccountAction';
import { Form, Button, Alert } from 'react-bootstrap';

const RetrieveLoyaltyAccountForm = () => {
  const [accountId, setAccountId] = useState('');
  const dispatch = useDispatch();
  const { loading, account, error } = useSelector((state) => state.loyaltyAccount);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(retrieveLoyaltyAccount(accountId));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="accountId">
        <Form.Label>Loyalty Account ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter loyalty account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        Retrieve Account
      </Button>
      {account && (
        <Alert variant="success" className="mt-3">
          Account Retrieved: {account.id}
        </Alert>
      )}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Form>
  );
};

export default RetrieveLoyaltyAccountForm;
