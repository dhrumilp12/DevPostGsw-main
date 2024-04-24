
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catalogSearch } from '../../Actions/catalogApisAction/catalogSearch';
import { Form, Button, Badge,Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure you have this import for Bootstrap styles
import { Link } from 'react-router-dom';
import { createCatalogImage} from '../../Actions/catalogApisAction/catalogImageAction';

const CatalogSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [objectId, setObjectId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { catalogItems, loading, error } = useSelector(state => state.catalogSearch);
 
   // Function to format price information
   const formatPrice = (priceMoney) => {
    if (priceMoney && priceMoney.currency && priceMoney.amount) {
      const amount = parseFloat(priceMoney.amount); // Convert the amount to a float
      if (!isNaN(amount)) { // Check if the conversion was successful
        return `${priceMoney.currency} ${(amount / 100).toFixed(2)}`;
      }
    }
    return 'Price Not Available';
  };
  
  
  const serviceDuration = (milliseconds) => `${milliseconds / 60000} minutes`;
    

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length < 2) {
      setErrorMessage('Please enter at least 2 characters.');
      return;
    }
    dispatch(catalogSearch(searchQuery));
    setErrorMessage(''); // Clear any existing error messages
  };

  const handleFileChange = (file, itemId) => {
    setSelectedFile(file);
    setObjectId(itemId);
  };

  const handleUploadImage = () => {
    if (!selectedFile || !objectId) {
      alert('File or item ID missing');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('objectId', objectId);
    dispatch(createCatalogImage(`/api/catalogs/images?objectId=${objectId}`, formData));
    setSelectedFile(null);
    setObjectId(null);
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
                <ListGroup variant="flush">
                  <ListGroup.Item>Price: {formatPrice(item.itemVariationData.priceMoney)}</ListGroup.Item>
                  <ListGroup.Item>Updated At: {new Date(item.updatedAt).toLocaleDateString()}</ListGroup.Item>
                  <ListGroup.Item>Service Duration: {serviceDuration(item.itemVariationData.serviceDuration)}</ListGroup.Item>
                  <ListGroup.Item>Available for Booking: {item.itemVariationData.availableForBooking ? 'Yes' : 'No'}</ListGroup.Item>
                  <ListGroup.Item>Present at All Locations: {item.itemVariationData.presentAtAllLocations ? 'Yes' : 'No'}</ListGroup.Item>
                  <ListGroup.Item>Team Members: {item.itemVariationData.teamMemberIds.join(', ')}</ListGroup.Item>
                </ListGroup>
                <Badge bg={item.itemVariationData.stockable ? 'success' : 'danger'} className="mb-2">
                  {item.itemVariationData.stockable ? 'In Stock' : 'Out of Stock'}
                </Badge>
                <Button as={Link} to={`/catalogSearchItem/${item.id}`} variant="outline-primary" className="me-2">Details</Button>
                <Button as={Link} to={`/catalogDeleteItem/${item.id}`} variant="outline-danger" className="me-2">Delete</Button>
                {!item.imageUrl && (
                  <>
                    <input type="file" onChange={(e) => handleFileChange(e.target.files[0], item.id)} hidden id={`file-upload-${item.id}`} />
                    <label htmlFor={`file-upload-${item.id}`} className="btn btn-sm btn-secondary">Upload Image</label>
                    <Button onClick={handleUploadImage} variant="success" className="mt-2">Upload</Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CatalogSearch;
