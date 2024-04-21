
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catalogSearch } from '../../Actions/catalogApisAction/catalogSearch';
import { Form, Button, Badge,Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure you have this import for Bootstrap styles

const CatalogSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { catalogItems, loading, error } = useSelector(state => state.catalogSearch);
  // Function to format price information
  const formatPrice = (price) => {
    return `${price.currency} ${price.amount / 100}`;
  };
  
    // Simple function to determine stock status based on item properties
  const stockStatus = (item) => item.itemVariationData.stockable ? 'In Stock' : 'Out of Stock';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length < 2) {
      setErrorMessage('Please enter at least 2 characters.');
      return;
    }
    dispatch(catalogSearch(searchQuery));
    setErrorMessage(''); // Clear any existing error messages
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
                isInvalid={!!errorMessage}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
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
              <Card.Img variant="top" src={item.imageUrl || '/path/to/placeholder-image.png'} />
              <Card.Body>
                <Card.Title>{item.itemVariationData?.name || 'No Name'}</Card.Title>
                <Card.Text>
                  Price: {formatPrice(item.itemVariationData.priceMoney)}
                </Card.Text>
                <Card.Text>
                  Updated At: {new Date(item.updatedAt).toLocaleDateString()}
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
