import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bulkRetrieveBookings } from '../../Actions/bookingApisAction/bookingBulkRetriveAction';
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';

const BulkRetrieveBookingsForm = () => {
  const [bookingIds, setBookingIds] = useState('');

  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.bulkRetrieveBookings);

  const handleChange = (e) => {
    setBookingIds(e.target.value.split(',').map(id => id.trim()));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(bulkRetrieveBookings(bookingIds));
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
                value={bookingIds.join(', ')}
                onChange={handleChange}
                placeholder="Enter booking IDs"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              Retrieve Bookings
            </Button>
          </Form>
          {error && <div className="error">{error}</div>}
          {bookings && (
            <ListGroup className="mt-4">
              {Object.values(bookings).map((booking) => (
                <ListGroup.Item key={booking.id}>
                  <div><strong>ID:</strong> {booking.id}</div>
                  <div><strong>Status:</strong> {booking.status}</div>
                  <div><strong>Start At:</strong> {booking.start_at}</div>
                  <div><strong>Customer ID:</strong> {booking.customer_id}</div>
                  {/* Add more booking details as needed */}
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
