import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchAdjustInventory } from '../../Actions/inventoryApi/inventoryBatchAdjustAction';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const BatchAdjustInventoryForm = () => {
  const [changes, setChanges] = useState([]);
  const [locationId, setLocationId] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.inventoryAdjustment);

  const handleAddChange = () => {
    setChanges([...changes, { catalog_object_id: '', quantity: '' }]);
  };

  const handleRemoveChange = (index) => {
    const newChanges = [...changes];
    newChanges.splice(index, 1);
    setChanges(newChanges);
  };

  const handleChange = (index, field, value) => {
    const newChanges = [...changes];
    newChanges[index][field] = value;
    setChanges(newChanges);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(batchAdjustInventory(changes, locationId));
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Batch Adjust Inventory</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                type="text"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                placeholder="Enter location ID"
              />
            </Form.Group>
            {changes.map((change, index) => (
              <div key={index} className="mb-3">
                <Form.Group>
                  <Form.Label>Item ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={change.catalog_object_id}
                    onChange={(e) => handleChange(index, 'catalog_object_id', e.target.value)}
                    placeholder="Enter item ID"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    value={change.quantity}
                    onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                    placeholder="Enter quantity"
                  />
                </Form.Group>
                <Button variant="danger" onClick={() => handleRemoveChange(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddChange} className="mb-3">
              Add Change
            </Button>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              Submit
            </Button>
          </Form>
          {error && <div className="error">{error}</div>}
        </Col>
      </Row>
    </Container>
  );
};

export default BatchAdjustInventoryForm;
