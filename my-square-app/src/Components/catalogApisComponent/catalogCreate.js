import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCatalog } from '../../Actions/catalogApisAction/catalogCreateAction';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from 'react-router-dom';

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
        serviceDuration: 60, // Default 1 hour in milliseconds
        availableForBooking: true,
        teamMemberIds: [] 
      },
    ],
});




  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { loading, error } = useSelector((state) => state.catalogCreate);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);
  
  const handleChange = (e, index, fieldName) => {
    const { name, value } = e.target;
    if (index !== undefined) { // Check if this change is for variations
        const updatedVariations = [...itemData.variations];
        if (name === 'amount') { // Directly check if the field is 'amount'
            updatedVariations[index].priceMoney.amount = Number(value); // Update the amount correctly
          } else if (name === 'serviceDuration') {
            // Convert minutes to milliseconds
            updatedVariations[index][name] = Number(value) * 60000;
          } else if (name === 'teamMemberIds') {
            updatedVariations[index].teamMemberIds = value.split(',').map(id => id.trim());
        } else {
            updatedVariations[index][name] = value;
        }
        setItemData({ ...itemData, variations: updatedVariations });
    } else {
        // This is for updating top-level fields like 'name' and 'description'
        setItemData({ ...itemData, [name]: value });
    }
};



const handleSubmit = async (e) => { // Mark function as async
  e.preventDefault();
  if (!itemData.name || itemData.variations.some(variation => !variation.name)) {
    toast.error("Please fill in all required fields.");
    return;
  }
  try {
    const createdCatalog = await dispatch(createCatalog(itemData));
    if (createdCatalog) {
      navigate(`/catalogSearchItem/${createdCatalog.id}`); // Redirect after creation
    }
  } catch (error) {
    toast.error("Failed to create catalog: " + error.toString());
  }
};
  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2 className="text-center mb-4">Create Catalog Item</h2>
          <Form onSubmit={handleSubmit} className="border p-4 bg-white rounded shadow-sm">
            <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={itemData.name}
                onChange={(e) => handleChange(e)}
                placeholder="Item Name"
                className="form-modern"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
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
                <Form.Label>Variation Name</Form.Label>
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
                <Form.Label>Price (in cents)</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={variation.priceMoney.amount}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Price (in cents)"
                    className="form-modern"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Service Duration (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    name="serviceDuration"
                    value={variation.serviceDuration / 60000}
                    onChange={(e) => handleChange(e, index, 'serviceDuration')}
                    placeholder="Duration in minutes"
                    className="form-modern"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Team Member IDs</Form.Label>
                  <Form.Control
                    type="text"
                    name="teamMemberIds"
                    value={variation.teamMemberIds.join(',')}
                    onChange={(e) => handleChange(e, index, 'teamMemberIds')}
                    placeholder="Enter Team Member IDs, separated by commas"
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