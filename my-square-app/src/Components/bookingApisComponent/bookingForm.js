import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../Actions/bookingApisAction/bookingCreateAction';

import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';


const BookingForm = ({ initialBookingDetails }) => {
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
    ...initialBookingDetails
  });
  // Access the logged-in user's customer ID from Redux state
  const { squareCustomerId } = useSelector(state => state.registerLogin);
  const [locations, setLocations] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const dispatch = useDispatch();
  const { loading, error, booking } = useSelector(state => state.booking);

  // Set the customer ID from the logged-in user's information
  useEffect(() => {
    if (squareCustomerId) {
        setBookingDetails(prevDetails => ({ ...prevDetails, customerId: squareCustomerId }));
    }
}, [squareCustomerId]);

  useEffect(() => {
    // Use POST request to match the updated backend endpoint
    fetch('http://localhost:3000/api/teams/members/search', {
        method: 'POST',  // Change method to POST
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer EAAAll40XS3OFGqEFTGfKovs3albhQW59-U0yIuGM_kxI6qXHVPIZM5WHWyBBbkV',  // Make sure to handle your access token correctly
        },
        body: JSON.stringify({
            query: {
                filter: {
                    status: "ACTIVE"
                }
            },
            limit: 10  // You can adjust the limit as per your requirements
        })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.error) {
        setTeamMembers(data);
    } else {
        toast.error('Failed to load team members');
      }
  })
  .catch(err => {
    console.error('Failed to fetch team members:', err);
    toast.error('Failed to fetch team members');
  });
  }, []);


  useEffect(() => {
    fetch('http://localhost:3000/api/location/locations', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer EAAAll40XS3OFGqEFTGfKovs3albhQW59-U0yIuGM_kxI6qXHVPIZM5WHWyBBbkV',  // Make sure to handle your access token correctly
        }
    })
    .then(response => response.json())
    .then(data => setLocations(data))
    .catch(err => console.error('Failed to fetch locations:', err));
}, []);

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
                <Form.Control as="select" name="locationId" value={bookingDetails.locationId} onChange={handleChange}>
                    <option value="">Select Location</option>
                    {locations.map(location => (
                        <option key={location.id} value={location.id}>{location.name} - {location.id}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer ID:</Form.Label>
              <Form.Control
                 type="text"               
                 readOnly
                 name="customerId"
                 value={bookingDetails.customerId}
                 placeholder="Customer ID"
                />
             </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Team Member ID:</Form.Label>
                    <Form.Control as="select" name="teamMemberId" value={bookingDetails.appointmentSegments[0].teamMemberId} onChange={handleChange}>
                      <option value="">Select Team Member</option>
                          {teamMembers.map((member) => (<option key={member.id} value={member.id}>{member.givenName} {member.familyName} - {member.id}</option>
                        ))}
                    </Form.Control>
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


