import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCatalogItem } from '../../Actions/catalogApisAction/catalogUpdateItemAction';
import { Form, Button, Row, Col } from 'react-bootstrap';

const UpdateCatalogItem = ({ itemId }) => {
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    variations: [{ name: '', pricingType: 'FIXED_PRICING', priceMoney: { amount: 0, currency: 'USD' } }],
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.catalogUpdate);

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleVariationChange = (index, field, value) => {
    const updatedVariations = [...itemData.variations];
    if (field === 'priceMoney') {
      updatedVariations[index][field] = { amount: value, currency: 'USD' };
    } else {
      updatedVariations[index][field] = value;
    }
    setItemData({ ...itemData, variations: updatedVariations });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCatalogItem(itemId, itemData));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={itemData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          value={itemData.description}
          onChange={handleChange}
        />
      </Form.Group>

      {itemData.variations.map((variation, index) => (
        <Row key={index} className="mb-3">
          <Col>
            <Form.Group controlId={`variationName-${index}`}>
              <Form.Label>Variation Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Variation name"
                value={variation.name}
                onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId={`variationPrice-${index}`}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                value={variation.priceMoney.amount}
                onChange={(e) => handleVariationChange(index, 'priceMoney', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      ))}

      <Button variant="primary" type="submit" disabled={loading}>
        Update Item
      </Button>
      {error && <div className="error">{error}</div>}
    </Form>
  );
};

export default UpdateCatalogItem;
