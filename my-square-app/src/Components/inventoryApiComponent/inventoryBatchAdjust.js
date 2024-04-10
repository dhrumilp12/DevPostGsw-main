
import React, { useState, useEffect } from 'react'; // Import useEffect
import { useDispatch, useSelector } from 'react-redux';
import { batchAdjustInventory } from '../../Actions/inventoryApi/inventoryBatchAdjustAction';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BatchAdjustInventoryForm = () => {
  const [adjustments, setAdjustments] = useState([]);
  const [locationId, setLocationId] = useState('');
  const [validated, setValidated] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // New state variable

  const dispatch = useDispatch();
  const { loading, error, result } = useSelector((state) => state.inventoryAdjustment);
  const navigate = useNavigate();

  useEffect(() => {
    if (submissionStatus === 'success' && !error) {
      navigate('/'); // Redirect to the home page
    }
  }, [submissionStatus, error, navigate]);

  const handleAddAdjustment = () => {
    setAdjustments([...adjustments, { catalogObjectId: '', quantity: '' }]);
  };

  const handleRemoveAdjustment = (index) => {
    const newAdjustments = [...adjustments];
    newAdjustments.splice(index, 1);
    setAdjustments(newAdjustments);
  };

  const handleAdjustmentChange = (index, field, value) => {
    const newAdjustments = [...adjustments];
    newAdjustments[index][field] = value;
    setAdjustments(newAdjustments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const changes = adjustments.map((adj) => ({
        type: 'ADJUSTMENT',
        adjustment: {
          catalogObjectId: adj.catalogObjectId,
          quantity: adj.quantity,
          fromState: 'IN_STOCK',
          toState: 'IN_STOCK',
          locationId: locationId,
        },
      }));
      dispatch(batchAdjustInventory(changes, locationId));
      setSubmissionStatus('submitted');
    }
    setValidated(true);
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Batch Adjust Inventory</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                type="text"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                placeholder="Enter location ID"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a location ID.
              </Form.Control.Feedback>
            </Form.Group>
            {adjustments.map((adj, index) => (
              <div key={index} className="mb-3">
                <Form.Group>
                  <Form.Label>Item ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={adj.catalogObjectId}
                    onChange={(e) => handleAdjustmentChange(index, 'catalogObjectId', e.target.value)}
                    placeholder="Enter item ID"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide an item ID.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    value={adj.quantity}
                    onChange={(e) => handleAdjustmentChange(index, 'quantity', e.target.value)}
                    placeholder="Enter quantity"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a quantity.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="danger" onClick={() => handleRemoveAdjustment(index)} className="mt-2">
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddAdjustment} className="mb-3">
              Add Adjustment
            </Button>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
            </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {result && !error && (
            <Alert variant="success" className="mt-3">Inventory adjusted successfully!</Alert>
          )}
          {result && (
            <Card className="mt-3">
              <Card.Header>Adjustment Result</Card.Header>
              <Card.Body>
                <pre>{JSON.stringify(result, null, 2)}</pre>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BatchAdjustInventoryForm;
