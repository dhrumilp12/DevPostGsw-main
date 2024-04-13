import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchAvailability } from '../../Actions/bookingApisAction/bookingSearchAvailabilityAction';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const SearchAvailabilityForm = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    startAt: '',
    endAt: '',
    locationId: '',
    serviceVariationId: '',
    teamMemberId: '',
  });

  const dispatch = useDispatch();
  const { availabilities, loading, error } = useSelector((state) => state.bookingAvailabilitySearch);

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchAvailability(searchCriteria));
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Search Availability</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Start At</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startAt"
                value={searchCriteria.startAt}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End At</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endAt"
                value={searchCriteria.endAt}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                type="text"
                name="locationId"
                value={searchCriteria.locationId}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Service Variation ID</Form.Label>
              <Form.Control
                type="text"
                name="serviceVariationId"
                value={searchCriteria.serviceVariationId}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Team Member ID</Form.Label>
              <Form.Control
                type="text"
                name="teamMemberId"
                value={searchCriteria.teamMemberId}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              Search
            </Button>
          </Form>
          {error && <div className="error">{error}</div>}
          <div className="availabilities">
            {availabilities && availabilities.length > 0 ? (
              <ul>
                {availabilities.map((availability, index) => (
                  <li key={index}>
                    Start At: {availability.startAt} - Location ID: {availability.locationId}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No availabilities found.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchAvailabilityForm;
