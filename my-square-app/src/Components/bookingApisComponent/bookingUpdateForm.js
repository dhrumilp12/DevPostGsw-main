import React, { useState } from 'react';
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
  const { loading } = useSelector(state => state.bookingUpdate);

  const [bookingData, setBookingData] = useState({
    version: 1, // Assuming 'version' should be initialized to 1 or fetched from a source
    customerNote: '',
    startAt: '',
    locationId: '',
    appointmentSegments: [] // Assuming segments are not needed for simple updates
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const versionNumber = parseInt(bookingData.version, 10);
    const formattedStartAt = moment(bookingData.startAt).toISOString();
  
    const updatedBookingData = {
      ...bookingData,
      version: versionNumber,
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
