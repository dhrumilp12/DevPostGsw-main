import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchRetrieveInventoryCounts } from '../../Actions/inventoryApi/inventoryBatchReytiveAction';
import { Form, Button, Container, Row, Col, Table, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap';

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
    if (itemIds.length === 0) {
      alert('Please enter at least one item ID.');
      return;
    }
    dispatch(batchRetrieveInventoryCounts(itemIds));
  };
  const handleClear = () => {
    setItemIds([]);
  };



  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className="text-center mb-4">Batch Retrieve Inventory Counts</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Item IDs (comma-separated)</Form.Label>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Enter item IDs separated by commas, e.g., 12345, 67890</Tooltip>}
              >
                <Form.Control
                  type="text"
                  value={itemIds.join(', ')}
                  onChange={handleChange}
                  placeholder="Enter item IDs"
                  autoFocus
                />
              </OverlayTrigger>
            </Form.Group>
            <div className="d-grid gap-2 mb-3">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Retrieving...' : 'Retrieve Counts'}
              </Button>
              <Button variant="secondary" onClick={handleClear} disabled={loading}>
                Clear
              </Button>
            </div>
          </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {!loading && counts.length > 0 && (
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

           {!loading && counts.length === 0 && !error && (
            <Alert variant="success" className="mt-3">No data found for the provided IDs.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BatchRetrieveInventoryCountsForm;