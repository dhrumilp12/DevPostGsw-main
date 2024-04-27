import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCatalog } from '../../Actions/catalogApisAction/catalogCreateAction';
import { Form, Button, Container, Row, Col, Spinner, Card } from 'react-bootstrap';
import Select from 'react-select';  // Assuming you've installed react-select
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

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
        serviceDuration: 60,
        availableForBooking: true,
        teamMemberIds: [] 
      },
    ],
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const teamMemberOptions = teamMembers.map(member => ({ value: member.id, label: `${member.givenName} ${member.familyName}` }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.catalogCreate);

  useEffect(() => {
    fetch('/api/teams/members/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PRODUCTION_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: {
          filter: {
            status: "ACTIVE"
          }
        },
        limit: 10
      })
    })
    .then(response => response.json())
    .then(data => {
      setTeamMembers(data);
    })
    .catch(err => {
      toast.error('Failed to fetch team members');
      console.error(err);
    });

    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleChange = (e, index, fieldName) => {
    if (fieldName === 'teamMemberIds') {
      const selectedOptions = e || []; // `e` is the selected options array or null
      const updatedVariations = [...itemData.variations];
      updatedVariations[index].teamMemberIds = selectedOptions.map(option => option.value);
      setItemData({ ...itemData, variations: updatedVariations });
    } else if (index !== undefined) {
      // This change is for variations
      const { name, value } = e.target; // Assuming e.target is present for other input types
      const updatedVariations = [...itemData.variations];
      if (name === 'amount') {
        updatedVariations[index].priceMoney.amount = Number(value); // Update the amount correctly
      } else if (name === 'serviceDuration') {
        updatedVariations[index][name] = Number(value) * 60000; // Convert minutes to milliseconds
      } else {
        updatedVariations[index][name] = value;
      }
      setItemData({ ...itemData, variations: updatedVariations });
    } else {
      // This is for updating top-level fields like 'name' and 'description'
      const { name, value } = e.target;
      setItemData({ ...itemData, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemData.name || itemData.variations.some(variation => !variation.name)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const createdCatalog = await dispatch(createCatalog(itemData));
      if (createdCatalog) {
        navigate(`/catalogSearchItem/${createdCatalog.id}`);
      }
    } catch (error) {
      toast.error("Failed to create catalog: " + error.toString());
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Row className="justify-content-center">
        <Col md={12} lg={7} xs={12}>
          <h2 className="text-center mb-4">Create Catalog Item</h2>
          <Form onSubmit={handleSubmit} className="border p-4 bg-white rounded shadow-sm">
            <Card body className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={itemData.name}
                  onChange={e => handleChange(e)}
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
                  onChange={e => handleChange(e)}
                  placeholder="Item Description"
                  className="form-modern"
                  rows={3}
                />
              </Form.Group>
            </Card>
            {itemData.variations.map((variation, index) => (
              <Card body key={index} className="mb-3">
                <h5>Variation {index + 1}</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Variation Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={variation.name}
                    onChange={e => handleChange(e, index)}
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
                    onChange={e => handleChange(e, index)}
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
                    onChange={e => handleChange(e, index, 'serviceDuration')}
                    placeholder="Duration in minutes"
                    className="form-modern"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Team Member IDs</Form.Label>
                  <Select
                    isMulti
                    name="teamMemberIds"
                    options={teamMemberOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={e => handleChange(e, index, 'teamMemberIds')}
                    value={teamMemberOptions.filter(option => variation.teamMemberIds.includes(option.value))}
                  />
                </Form.Group>
              </Card>
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
