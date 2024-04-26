// BatchRetrieveInventoryCountsForm provides functionality to fetch inventory counts for selected catalog items.
// It handles selection of multiple item IDs and submits them to retrieve inventory counts, showing results in a table format.
// Manages loading states and errors, and includes user instructions via tooltips for selecting multiple items.

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batchRetrieveInventoryCounts } from '../../Actions/inventoryApi/inventoryBatchRetriveAction';
import { fetchCatalog } from '../../Actions/catalogApisAction/catalogListAction';
import { Form, Button, Container, Row, Col, Table, Alert, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';

const BatchRetrieveInventoryCountsForm = () => {
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const dispatch = useDispatch();
  const { catalog, loading: catalogLoading, error: catalogError } = useSelector(state => state.catalogList);
  const { counts, loading: inventoryLoading, error: inventoryError } = useSelector(state => state.inventoryCounts);

  useEffect(() => {
    if (!catalog.length) {
      dispatch(fetchCatalog());
    }
  }, [dispatch, catalog.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedItemIds.length === 0) {
      alert('Please select at least one item ID.');
      return;
    }
    dispatch(batchRetrieveInventoryCounts(selectedItemIds));
  };

  const handleClear = () => {
    setSelectedItemIds([]);
  };

  const handleChange = (e) => {
    const newSelections = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedItemIds(newSelections);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Hold down 'Ctrl' (Cmd on Mac) and click to select multiple items.
    </Tooltip>
  );

  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className="text-center mb-4">Batch Retrieve Inventory Counts</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Item IDs</Form.Label>
              <OverlayTrigger placement="right" overlay={renderTooltip}>
              <Form.Control
                  as="select"
                  multiple
                  value={selectedItemIds}
                  onChange={handleChange}
                  disabled={catalogLoading}
                  className="custom-select shadow-none"
                  style={{ height: 'auto', backgroundColor: '#fff', borderColor: '#ced4da' }}
                >
                  <option disabled>Select one or more items (Ctrl-click to select multiple)</option>
                  {catalog.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.itemVariationData?.name || 'Unnamed Item'}
                    </option>
                  ))}
                </Form.Control>
              </OverlayTrigger>
              {catalogError && <Alert variant="danger">Error fetching catalog: {catalogError}</Alert>}
            </Form.Group>
            <div className="d-grid gap-2 mb-3">
              <Button variant="primary" type="submit" disabled={inventoryLoading}>
                {inventoryLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Retrieve Counts'}
              </Button>
              <Button variant="secondary" onClick={handleClear} disabled={inventoryLoading}>
                Clear Selection
              </Button>
            </div>
          </Form>
          {inventoryError && <Alert variant="danger">Error retrieving counts: {inventoryError}</Alert>}
          {!inventoryLoading && counts.length > 0 && (
            <Table striped bordered hover responsive className="mt-4">
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
          {!inventoryLoading && counts.length === 0 && !inventoryError && (
            <Alert variant="success" className="mt-3">No inventory counts found for the selected items. Please try different items or check back later.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BatchRetrieveInventoryCountsForm;
