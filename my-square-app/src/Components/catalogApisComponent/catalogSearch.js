import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catalogSearch } from '../../Actions/catalogApisAction/catalogSearch';
import { Form, Button, ListGroup } from 'react-bootstrap';

const CatalogSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { catalogItems, loading, error } = useSelector((state) => state.catalogSearch);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(catalogSearch(searchQuery));
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="searchQuery">
          <Form.Label>Search Catalog</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter search query" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Search
        </Button>
      </Form>
      {error && <div className="error">{error}</div>}
      <ListGroup>
        {catalogItems.map((item) => (
          <ListGroup.Item key={item.id}>{item.item_data.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CatalogSearch;
