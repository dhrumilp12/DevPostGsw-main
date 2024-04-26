// UpdateBookingForm allows users to update various details of an existing booking.
// The form pre-fills current booking details fetched from the global state and allows editing fields like start time, customer notes, and location.
// It dispatches the `updateBooking` action upon form submission and provides feedback via toast notifications based on the outcome.

import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBooking } from '../../Actions/bookingApisAction/bookingUpdateAction';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const UpdateBookingForm = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector(state => state.bookingsList);
  const booking = bookings.find(b => b.id === bookingId);

   const [bookingData, setBookingData] = useState({
    version: booking?.version || 1, // Initialize with existing version if available, otherwise default to 1
    customerNote: booking?.customerNote || '',
    startAt: booking?.startAt ? moment(booking.startAt).format('YYYY-MM-DDTHH:mm') : '',
    locationId: booking?.locationId || '', // Pre-fill the locationId
    appointmentSegments: booking?.appointmentSegments || [] // Pre-fill if needed
  });

  useEffect(() => {
    // Update the form state if booking data is fetched after component mounts
    if (booking) {
      setBookingData({
        version: booking.version,
        customerNote: booking.customerNote,
        startAt: moment(booking.startAt).format('YYYY-MM-DDTHH:mm'),
        locationId: booking.locationId,
        appointmentSegments: booking.appointmentSegments
      });
    }
  }, [booking]); // Re-run this effect if booking changes (which it shouldn't in normal conditions)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedStartAt = moment(bookingData.startAt).toISOString();
  
    const updatedBookingData = {
      ...bookingData,
      version: parseInt(bookingData.version, 10),
      startAt: formattedStartAt
    };
  
    try {
      const successMessage = await dispatch(updateBooking(bookingId, updatedBookingData));
      toast.success(successMessage);
    } catch (error) {
      toast.error(`Error updating booking: ${error}`);
    }
  };
  

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
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Update Booking'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateBookingForm;
