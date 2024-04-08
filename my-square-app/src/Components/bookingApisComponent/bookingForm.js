import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../Actions/bookingApisAction/bookingCreateAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';

const BookingForm = () => {
  const [bookingDetails, setBookingDetails] = useState({
    customerId: '',
    startAt: '',
    locationId: '',
    teamMemberId: '',
    serviceVariationId: '',
    serviceVariationVersion: '',
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.booking);

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking(bookingDetails));
  };
  if (error) {
    toast.error(`Error: ${error}`);
  }

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Create Booking</h2>
          <Form onSubmit={handleSubmit} className="border p-4 bg-white rounded shadow-sm">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="customerId"
                value={bookingDetails.customerId}
                onChange={handleChange}
                placeholder="Customer ID"
                className="form-modern"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="datetime-local" 
                name="startAt"
                value={bookingDetails.startAt}
                onChange={handleChange}
                placeholder="Start At (e.g., 2020-11-26T13:00:00Z)"
                className="form-modern"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="locationId"
                value={bookingDetails.locationId}
                onChange={handleChange}
                placeholder="Location ID"
                className="form-modern"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="teamMemberId"
                value={bookingDetails.teamMemberId}
                onChange={handleChange}
                placeholder="Team Member ID"
                className="form-modern"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="serviceVariationId"
                value={bookingDetails.serviceVariationId}
                onChange={handleChange}
                placeholder="Service Variation ID"
                className="form-modern"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="serviceVariationVersion"
                value={bookingDetails.serviceVariationVersion}
                onChange={handleChange}
                placeholder="Service Variation Version"
                className="form-modern"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Create Booking'
              )}
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Custom CSS */}
      <style type="text/css">
        {`
          .form-modern {
            border-radius: 0.5rem; // Rounded corners for inputs
            border: 1px solid #ced4da; // Match Bootstrap's default border color
            padding: 0.5rem 1rem; // Increase padding for better touch targets
          }

          .form-modern:focus {
            border-color: #0d6efd; // Bootstrap primary color on focus
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); // Bootstrap's default focus shadow
          }

          .btn-primary {
            background-color: #0d6efd; // Bootstrap primary color
            border-color: #0d6efd; // Match border color to background
          }

          .btn-primary:hover {
            background-color: #0b5ed7; // Darken background on hover
            border-color: #0a58ca; // Match border color to background
          }
        `}
      </style>
    </Container>
  );
};

export default BookingForm;
