import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bulkRetrieveBookings } from '../../Actions/bookingApisAction/bookingBulkRetriveAction';
import { Form, Button, Container, Row, Col, Card, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';

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
    dispatch(bulkRetrieveBookings(ids));
  };

  const renderError = () => {
    return typeof error === 'string' ? error : error?.response?.data?.message || 'An error occurred';
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to copy ID
    </Tooltip>
  );

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="p-4 shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">Bulk Retrieve Bookings</Card.Title>
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
                  {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Retrieve Bookings'}
                </Button>
              </Form>
              {error && <div className="alert alert-danger mt-3">{renderError()}</div>}
            </Card.Body>
          </Card>

          {bookings && (
            <Row xs={1} md={2} lg={3} className="g-4 mt-4">
              {Object.entries(bookings).map(([id, bookingData]) => {
                const { booking } = bookingData;
                return (
                  <Col key={id}>
                    <Card className="h-100 shadow">
                      <Card.Body>
                        <Card.Title>
                          <OverlayTrigger
                            placement="top"
                            overlay={renderTooltip}
                          >
                            <Button variant="link" onClick={() => navigator.clipboard.writeText(id)}>
                              Booking ID: {id}
                            </Button>
                          </OverlayTrigger>
                        </Card.Title>
                        <Card.Text>
                          <strong>Status:</strong> {booking.status}<br />
                          <strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}<br />
                          <strong>Start At:</strong> {new Date(booking.startAt).toLocaleString()}<br />
                          <strong>Customer ID:</strong> {booking.customerId}<br />
                          <strong>Location ID:</strong> {booking.locationId}<br />
                          {/* Add more details as necessary */}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">Last updated {new Date(booking.updatedAt).toLocaleString()}</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BulkRetrieveBookingsForm;
