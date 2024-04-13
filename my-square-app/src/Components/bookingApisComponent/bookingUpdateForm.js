import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBooking } from '../../Actions/bookingApisAction/bookingUpdateAction';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBookingForm = ({ bookingId }) => {
  const [bookingData, setBookingData] = useState({
    version: 0,
    customerNote: '',
    startAt: '',
    locationId: '',
    appointmentSegments: [],
    // Add other necessary fields as needed
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.bookingUpdate);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBooking(bookingId, bookingData));
  };

  if (error) {
    toast.error(`Error: ${error}`);
  }

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Update Booking</h2>
          <Form onSubmit={handleSubmit} className="border p-4 bg-white rounded shadow-sm">
            <Form.Group className="mb-3">
              <Form.Label>Version</Form.Label>
              <Form.Control
                type="number"
                name="version"
                value={bookingData.version}
                onChange={handleChange}
                placeholder="Version"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer Note</Form.Label>
              <Form.Control
                type="text"
                name="customerNote"
                value={bookingData.customerNote}
                onChange={handleChange}
                placeholder="Customer Note"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start At</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startAt"
                value={bookingData.startAt}
                onChange={handleChange}
                placeholder="Start At"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                type="text"
                name="locationId"
                value={bookingData.locationId}
                onChange={handleChange}
                placeholder="Location ID"
              />
            </Form.Group>
            {/* Add more form fields for other booking attributes */}
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Update Booking'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateBookingForm;
