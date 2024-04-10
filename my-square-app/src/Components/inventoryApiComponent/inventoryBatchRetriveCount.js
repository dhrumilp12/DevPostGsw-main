import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchRetrieveInventoryCounts } from '../../Actions/inventoryApi/inventoryBatchReytiveAction';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';

const BatchRetrieveInventoryCountsForm = () => {
  const [itemIds, setItemIds] = useState([]); // Initialize as an empty array

  const dispatch = useDispatch();
  const { counts, loading, error } = useSelector((state) => state.inventoryCounts);

  const handleChange = (e) => {
    const newItemIds = e.target.value.split(',').map(id => id.trim());
    setItemIds(newItemIds);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(batchRetrieveInventoryCounts(itemIds));
  };


  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Batch Retrieve Inventory Counts</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Item IDs (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={itemIds.join(', ')}
                onChange={handleChange}
                placeholder="Enter item IDs"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              Retrieve Counts
            </Button>
          </Form>
          {error && <div className="error">{error}</div>}
          {counts.length > 0 && (
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Location ID</th>
                  <th>Quantity</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {counts.map((count, index) => (
                  <tr key={index}>
                    <td>{count.catalogObjectId}</td>
                    <td>{count.locationId}</td>
                    <td>{count.quantity}</td>
                    <td>{count.state}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BatchRetrieveInventoryCountsForm;
