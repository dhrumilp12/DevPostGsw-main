// SearchAvailabilityForm allows users to search for booking availability based on specific criteria including dates, location, and team members.
// The component fetches and lists available slots, handling potential errors with user feedback.
// It ensures the start and end dates are valid and within a permissible range before submitting the search.

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchAvailability } from '../../Actions/bookingApisAction/bookingSearchAvailabilityAction';
import { Form, Button, Container, Row, Col, Alert, Spinner, Card, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCatalog } from '../../Actions/catalogApisAction/catalogListAction'; // Import the fetchCatalog action if not already imported

const SearchAvailabilityForm = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    startAt: '',
    endAt: '',
    locationId: '',
    serviceVariationId: '',
    teamMemberId: '',
  });

  const dispatch = useDispatch();
  const [locations, setLocations] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const { availabilities, loading, error } = useSelector((state) => state.bookingAvailabilitySearch);
  const { catalog } = useSelector(state => state.catalogList); // Assuming you have catalogList in your Redux state
  
  useEffect(() => {
    if (!catalog.length) { // Only fetch if catalog is empty or under certain conditions
      dispatch(fetchCatalog());
    }
  }, [dispatch, catalog.length]); // Depend on catalog.length to avoid unnecessary re-fetches
  

  useEffect(() => {
    fetch('/api/teams/members/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PRODUCTION_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
            query: {
                filter: {
                    status: "ACTIVE"
                }
            },
            limit: 10
        })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error('Failed to load team members');
      }
      setTeamMembers(data);
    })
    .catch(err => {
      console.error('Failed to fetch team members:', err);
      toast.error('Failed to fetch team members');
    });
  }, []);

  useEffect(() => {
    fetch('/api/location/locations', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PRODUCTION_ACCESS_TOKEN}`,
        }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error('Failed to load locations');
      }
      setLocations(data);
    })
    .catch(err => {
      console.error('Failed to fetch locations:', err);
      toast.error('Failed to fetch locations');
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  
    if (name === 'serviceVariationId') {
      // Find the selected service variation in the catalog
      const selectedVariation = catalog.find(item => item.id === value);
      if (selectedVariation && selectedVariation.itemVariationData.teamMemberIds.length === 1) {
        // Automatically set the teamMemberId if there is only one
        setSearchCriteria(prev => ({
          ...prev,
          [name]: value,
          teamMemberId: selectedVariation.itemVariationData.teamMemberIds[0]
        }));
      } else {
        // Reset teamMemberId if more than one or no team members are associated
        setSearchCriteria(prev => ({
          ...prev,
          [name]: value,
          teamMemberId: ''
        }));
      }
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchCriteria.startAt || !searchCriteria.endAt || !searchCriteria.locationId) {
      toast.error("Please fill all required fields.");
      return;
    }

    const startDate = new Date(searchCriteria.startAt);
    const endDate = new Date(searchCriteria.endAt);
    const now = new Date();

    if (startDate >= endDate) {
      toast.error("The end date must be after the start date.");
      return;
    }

    if (startDate < now || endDate < now) {
      toast.error("Dates must be in the future.");
      return;
    }

    const dayDifference = (endDate - startDate) / (1000 * 3600 * 24);
    if (dayDifference > 32) {
      toast.error("The maximum query range is 32 days.");
      return;
    }

    dispatch(searchAvailability(searchCriteria));
  };

  return (
    <Container fluid="md">
      <ToastContainer position="top-center" autoClose={5000} />
      <Row className="justify-content-md-center my-5">
        <Col md={10} lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <FaSearch className="me-2" />Search Availability
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Start At</Form.Label>
                      <Form.Control type="datetime-local" name="startAt" value={searchCriteria.startAt} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>End At</Form.Label>
                      <Form.Control type="datetime-local" name="endAt" value={searchCriteria.endAt} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Location ID</Form.Label>
                  <Form.Control as="select" name="locationId" value={searchCriteria.locationId} onChange={handleChange}>
                    <option value="">Select Location</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>{location.name} - {location.id}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Service Variation ID</Form.Label>
                  <Form.Control as="select" name="serviceVariationId" value={searchCriteria.serviceVariationId} onChange={handleChange}>
                  <option value="">Select Service Variation</option>
                  {catalog.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.itemVariationData.name} - {item.id}
                    </option>
                  ))}
                </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Team Member ID</Form.Label>
                  <Form.Control as="select" name="teamMemberId" value={searchCriteria.teamMemberId} onChange={handleChange}>
                <option value="">Select Team Member</option>
                {teamMembers.filter(member => {
                  const selectedVariation = catalog.find(item => item.id === searchCriteria.serviceVariationId);
                  return selectedVariation ? selectedVariation.itemVariationData.teamMemberIds.includes(member.id) : true;
                }).map(member => (
                  <option key={member.id} value={member.id}>{member.givenName} {member.familyName} - {member.id}</option>
                ))}
              </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                  {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : <><FaSearch className="me-2" />Search</>}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center my-3">
        <Col md={10} lg={8}>
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {!loading && !error && (
            <ListGroup variant="flush">
              {availabilities && availabilities.length > 0 ? (
                availabilities.map((availability, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Start At:</strong> {new Date(availability.startAt).toLocaleString()}
                    </div>
                    <span className="badge bg-primary rounded-pill">{availability.locationId}</span>
                  </ListGroup.Item>
                ))
              ) : <ListGroup.Item>No availabilities found.</ListGroup.Item>}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchAvailabilityForm;
