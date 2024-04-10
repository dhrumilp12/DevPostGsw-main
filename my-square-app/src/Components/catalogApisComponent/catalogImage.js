import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCatalogImage } from '../../Actions/catalogApisAction/catalogUpdateImage';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const CatalogImage = () => {
  const [imageData, setImageData] = useState(null);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.catalogImage);

  const handleChange = (e) => {
    setImageData(e.target.files[0]); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageData) {
      toast.error('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageData);

    dispatch(uploadCatalogImage(formData));
  };

  if (error) {
    toast.error(`Error: ${error}`);
  }

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Upload Catalog Image</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image File</Form.Label>
              <Form.Control type="file" onChange={handleChange} />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Upload Image'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CatalogImage;
