// BulkRetrieveBookingsForm enables retrieving multiple bookings at once based on a selection of booking IDs.
// Users can select multiple bookings from a dropdown, which are fetched in bulk using the `bulkRetrieveBookings` action.
// It displays each retrieved booking in a detailed card view, with functionality to copy the booking ID to the clipboard.

import React, { useEffect, useState } from 'react';
import { fetchBookings } from '../../Actions/bookingApisAction/bookingListAction';
import { useDispatch, useSelector } from 'react-redux';
import { bulkRetrieveBookings } from '../../Actions/bookingApisAction/bookingBulkRetriveAction';
import { Form, Button, Container, Row, Col, Card, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Select from 'react-select';

// Component to handle bulk retrieval of bookings based on an array of booking IDs
const BulkRetrieveBookingsForm = () => {
  const dispatch = useDispatch();
  const { bookings: bookingList, loading: bookingsLoading } = useSelector(state => state.bookingsList);
  const { bookings, loading, error } = useSelector(state => state.bulkRetrieveBookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);
  const [bookingIds, setBookingIds] = useState([]);
 const handleChange = (selectedOptions) => {
    setBookingIds(selectedOptions.map(option => option.value));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookingIds.length > 0) {
      dispatch(bulkRetrieveBookings(bookingIds));
    } else {
      alert('Please select at least one booking ID.');
    }
  };

 

  const getOptions = () => {
    return bookingList.map(booking => ({ value: booking.id, label: `ID: ${booking.id}, Customer: ${booking.customerId}` }));
  };

  const renderError = () => {
    if (typeof error === 'string') {
      return error;
    }
    if (error && typeof error === 'object' && error.error) {
      return error.error; // Adjust based on the actual error object structure
    }
    return 'An unexpected error occurred';
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
                  <Select
                    options={getOptions()}
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100" disabled={loading || bookingsLoading}>
                  {loading || bookingsLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Retrieve Bookings'}
                </Button>
                </Form>
                {error && <div className="alert alert-danger mt-3">{renderError()}</div>}
            </Card.Body>
          </Card>

          {bookings && (
            <Row xs={1} md={2} lg={1} className="g-4 mt-4">
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




