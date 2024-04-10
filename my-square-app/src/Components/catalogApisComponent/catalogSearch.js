
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catalogSearch } from '../../Actions/catalogApisAction/catalogSearch';
import { Form, Button, Badge,Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure you have this import for Bootstrap styles

const CatalogSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { catalogItems, loading, error } = useSelector(state => state.catalogSearch);

  const stockStatus = (item) => {
    // Check if any variation is in stock (quantity greater than 0)
    const isInStock = item.itemData?.variations?.some(variation => 
      parseInt(variation.itemVariationData.quantity) > 0
    );
    return isInStock ? 'In Stock' : 'Out of Stock';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(catalogSearch(searchQuery));
  };

  return (
    <Container fluid="md" className="mt-5">
      <Row>
        <Col md={12}>
          <Form onSubmit={handleSearch} className="mb-4">
            <Form.Group controlId="searchQuery" className="mb-3">
              <Form.Label>Search Catalog</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter search query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-2"
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              Search
            </Button>
          </Form>
          {error && <div className="alert alert-danger">{error}</div>}
        </Col>
      </Row>
      <Row>
        {catalogItems.map((item) => (
          <Col sm={12} md={6} lg={4} xl={3} key={item.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.itemData?.image_url || '/path/to/placeholder-image.png'} />
              <Card.Body>
                <Card.Title>{item.itemData?.name || 'No Name'}</Card.Title>
                <Card.Text>
                  {item.itemData?.description || 'No Description'}
                </Card.Text>
                <Badge bg={stockStatus(item) === 'In Stock' ? 'success' : 'danger'} className="mb-2">
                  {stockStatus(item)}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CatalogSearch;
