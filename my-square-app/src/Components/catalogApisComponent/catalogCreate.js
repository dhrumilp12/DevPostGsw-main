import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCatalog } from '../../Actions/catalogApisAction/catalogCreateAction';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CatalogCreate = () => {
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    variations: [
      {
        name: '',
        pricingType: 'FIXED_PRICING',
        priceMoney: {
          amount: 0,
          currency: 'USD',
        },
      },
    ],
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.catalogCreate);

  const handleChange = (e, index) => {
    if (index !== undefined) {
      // Handle change in variations
      const updatedVariations = [...itemData.variations];
      if (e.target.name === 'amount') {
        updatedVariations[index].priceMoney[e.target.name] = Number(e.target.value);
      } else {
        updatedVariations[index][e.target.name] = e.target.value;
      }
      setItemData({ ...itemData, variations: updatedVariations });
    } else {
      // Handle change in itemData
      setItemData({ ...itemData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCatalog(itemData));
  };

  if (error) {
    toast.error(`Error: ${error}`);
  }

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className="text-center mb-4">Create Catalog Item</h2>
          <Form onSubmit={handleSubmit} className="border p-4 bg-white rounded shadow-sm">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="name"
                value={itemData.name}
                onChange={handleChange}
                placeholder="Item Name"
                className="form-modern"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                name="description"
                value={itemData.description}
                onChange={handleChange}
                placeholder="Item Description"
                className="form-modern"
                rows={3}
              />
            </Form.Group>
            {itemData.variations.map((variation, index) => (
              <div key={index} className="mb-3 border p-3 rounded">
                <h5>Variation {index + 1}</h5>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    value={variation.name}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Variation Name"
                    className="form-modern"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    name="amount"
                    value={variation.priceMoney.amount}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Price (in cents)"
                    className="form-modern"
                  />
                </Form.Group>
              </div>
            ))}
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Create Item'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CatalogCreate;