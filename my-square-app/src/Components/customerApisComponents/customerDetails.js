// src/components/CustomerDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCustomerDetails } from '../../Actions/customerApisAction/customerDetailsAction';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Spinner, Alert, Button, ListGroup } from 'react-bootstrap';
 
const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;
 
  // Local state for toggling extra details
  const [showExtraDetails, setShowExtraDetails] = useState(false);
 
  useEffect(() => {
    dispatch(fetchCustomerDetails(customerId));
  }, [dispatch, customerId]);
 
  const toggleExtraDetails = () => {
    setShowExtraDetails(!showExtraDetails);
  };
 
  // Function to navigate to the UpdateCustomer component
  const handleUpdateClick = () => {
    navigate(`/update-customer/${customerId}`);
  };
 
  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger">An error occurred: {error.message || error}</Alert>
          ) : (
            customer && (
              <>
                <Card.Title className="text-center mb-3">Customer Details</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {customer.givenName} {customer.familyName}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Email:</strong> {customer.emailAddress}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Phone:</strong> {customer.phoneNumber}
                  </ListGroup.Item>
                  {/* Conditional rendering for address, only if address exists */}
                  {customer.address && (
                    <>
                      <ListGroup.Item>
                        <strong>Address:</strong> {customer.address.addressLine1}, {customer.address.addressLine2}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>City:</strong> {customer.address.locality}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>State/Province:</strong> {customer.address.administrativeDistrictLevel1}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Postal Code:</strong> {customer.address.postalCode}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Country:</strong> {customer.address.country}
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
                <div className="mt-3 text-center">
                  <Button onClick={toggleExtraDetails} variant={showExtraDetails ? "secondary" : "primary"}>
                    {showExtraDetails ? 'Hide Extra Details' : 'Show Extra Details'}
                  </Button>
                  {' '}
                  <Button onClick={handleUpdateClick} variant="warning">
                    Update Customer
                  </Button>
                </div>
                {showExtraDetails && (
                  <Card className="mt-3">
                    <Card.Header>Extra Details</Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Created At:</strong> {new Date(customer.createdAt).toLocaleString()}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Last Updated:</strong> {new Date(customer.updatedAt).toLocaleString()}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Note:</strong> {customer.note ? customer.note : 'No note available.'}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                )}
              </>
            )
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
 
export default CustomerDetails;