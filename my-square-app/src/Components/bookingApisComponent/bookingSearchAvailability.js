import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchAvailability } from '../../Actions/bookingApisAction/bookingSearchAvailabilityAction';
import { Form, Button, Container, Row, Col, Alert, Spinner, Card, ListGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                  <Form.Control type="text" name="locationId" value={searchCriteria.locationId} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Service Variation ID</Form.Label>
                  <Form.Control type="text" name="serviceVariationId" value={searchCriteria.serviceVariationId} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Team Member ID</Form.Label>
                  <Form.Control type="text" name="teamMemberId" value={searchCriteria.teamMemberId} onChange={handleChange} />
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
