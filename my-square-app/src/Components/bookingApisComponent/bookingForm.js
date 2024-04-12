import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../Actions/bookingApisAction/bookingCreateAction';

import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';

const BookingForm = () => {
  const [bookingDetails, setBookingDetails] = useState({
    startAt: '',
    locationId: '',
    customerId: '',
    appointmentSegments: [{
      teamMemberId: '',
      serviceVariationId: '',
      serviceVariationVersion: '',
      durationMinutes: ''
    }],
  });

  const dispatch = useDispatch();
  const { loading, error, booking } = useSelector(state => state.booking);



  const handleChange = (e) => {
    if (e.target.name === 'teamMemberId' || e.target.name === 'serviceVariationId' || e.target.name === 'serviceVariationVersion' || e.target.name === 'durationMinutes') {
      setBookingDetails({
        ...bookingDetails,
        appointmentSegments: [{ ...bookingDetails.appointmentSegments[0], [e.target.name]: e.target.value }]
      });
    } else {
      setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking({ booking: bookingDetails }));
  };

// BookingForm.js

useEffect(() => {
  console.log(booking); // Check if booking is updated
  if (booking) {
    toast.success('Booking created successfully!');
  }
}, [booking]);

 useEffect(() => {
        if (error) {
            toast.error(`Error: ${error}`);
            // Consider dispatching an action to clear the error after displaying it
            // dispatch(clearBookingErrorAction());
        }
    }, [error]);
console.log({ booking, error });
  return (
    <Container>
      <ToastContainer position="top-center" autoClose={5000} />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Create Booking</h2>
          <Form onSubmit={handleSubmit} className="border p-4 bg-white rounded shadow-sm">
            <Form.Group className="mb-3">
              <Form.Label>Start At:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startAt"
                value={bookingDetails.startAt}
                onChange={handleChange}
                placeholder="Start At (e.g., 2024-04-19T01:50:00Z)"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location ID:</Form.Label>
              <Form.Control
                type="text"
                name="locationId"
                value={bookingDetails.locationId}
                onChange={handleChange}
                placeholder="Location ID"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer ID:</Form.Label>
              <Form.Control
                type="text"
                name="customerId"
                value={bookingDetails.customerId}
                onChange={handleChange}
                placeholder="Customer ID"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Team Member ID:</Form.Label>
              <Form.Control
                type="text"
                name="teamMemberId"
                value={bookingDetails.appointmentSegments[0].teamMemberId}
                onChange={handleChange}
                placeholder="Team Member ID"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Service Variation ID:</Form.Label>
              <Form.Control
                type="text"
                name="serviceVariationId"
                value={bookingDetails.appointmentSegments[0].serviceVariationId}
                onChange={handleChange}
                placeholder="Service Variation ID"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Service Variation Version:</Form.Label>
              <Form.Control
                type="text"
                name="serviceVariationVersion"
                value={bookingDetails.appointmentSegments[0].serviceVariationVersion}
                onChange={handleChange}
                placeholder="Service Variation Version"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration Minutes:</Form.Label>
              <Form.Control
                type="number"
                name="durationMinutes"
                value={bookingDetails.appointmentSegments[0].durationMinutes}
                onChange={handleChange}
                placeholder="Duration Minutes"
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner animation="border" /> : 'Create Booking'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;


