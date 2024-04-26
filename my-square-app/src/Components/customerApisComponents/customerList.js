// CustomerList fetches and displays a list of customers from the Redux store.
// It handles loading states with a spinner and errors with an alert.
// Each customer is displayed with their name, email, and a unique identifier, utilizing icons for a better visual representation.

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers } from '../../Actions/customerApisAction/customerListAction';
import { ListGroup, Spinner, Alert, Container, Card } from 'react-bootstrap';
import { FaUserCircle, FaEnvelope, FaIdBadge } from 'react-icons/fa';


const CustomerList = () => {
  const dispatch = useDispatch();
  const { customers = [], loading, error } = useSelector((state) => state.customerList);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Alert variant="danger">Error: {error}</Alert>
    );
  }

  return (
    <Container fluid="md" className="my-4">
      <Card>
        <Card.Header className="text-center bg-dark text-white">
          <h2>Customer List</h2>
        </Card.Header>
        <ListGroup variant="flush">
          {customers.length > 0 ? (
            customers.map((customer) => (
              <ListGroup.Item key={customer.id} className="d-flex justify-content-start align-items-center border-bottom">
                <FaUserCircle size="2em" className="me-3 text-secondary" />
                <div className="me-auto">
                  <h5 className="mb-0">{customer.givenName} {customer.familyName}</h5>
                  <small className="text-muted">
                    <FaEnvelope className="me-1" />
                    {customer.emailAddress}
                  </small>
                </div>
                <span className="badge bg-primary rounded-pill">
                  <FaIdBadge className="me-1" />
                  {customer.id}
                </span>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-center">
              No customers found.
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default CustomerList;