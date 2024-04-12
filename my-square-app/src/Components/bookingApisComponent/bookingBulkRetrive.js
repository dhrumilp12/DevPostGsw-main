import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bulkRetrieveBookings } from '../../Actions/bookingApisAction/bookingBulkRetriveAction';
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';

const BulkRetrieveBookingsForm = () => {
  const [bookingIdsInput, setBookingIdsInput] = useState('');
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector(state => state.bulkRetrieveBookings);

  const handleChange = (e) => {
    setBookingIdsInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ids = bookingIdsInput.split(',').map(id => id.trim());
    console.log('Submitting IDs:', ids); // Log the IDs to ensure they are parsed correctly
    dispatch(bulkRetrieveBookings(ids));
  };
  

  const renderError = () => {
    // If the error is a string, render it directly.
    // If the error is an object, attempt to render a nested message property or default to a general message.
    if (typeof error === 'string') {
      return error;
    }
    if (error && error.response && error.response.data) {
      return error.response.data.message;
    }
    return 'An error occurred';
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Bulk Retrieve Bookings</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Booking IDs (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={bookingIdsInput}
                onChange={handleChange}
                placeholder="Enter booking IDs"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              Retrieve Bookings
            </Button>
          </Form>
          {error && <div className="alert alert-danger">{renderError()}</div>}
          {bookings && (
            <ListGroup className="mt-4">
              {Object.entries(bookings).map(([id, bookingData]) => (
                <ListGroup.Item key={id}>
                  <div><strong>ID:</strong> {id}</div>
                  <div><strong>Status:</strong> {bookingData.booking.status}</div>
                  <div><strong>Start At:</strong> {new Date(bookingData.booking.startAt).toLocaleString()}</div>
                  <div><strong>Customer ID:</strong> {bookingData.booking.customerId}</div>
                  {/* Add more details as necessary */}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BulkRetrieveBookingsForm;
