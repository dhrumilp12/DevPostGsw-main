import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCatalog } from '../../Actions/catalogApisAction/catalogListAction';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { Container, Row, Col, Card, Badge, Image } from 'react-bootstrap'; // Import Image from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const Catalog = () => {
  const dispatch = useDispatch();
  const { catalog, loading, error } = useSelector((state) => state.catalogList);

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const stockBadge = (stockable) => {
    let variant = 'success';
    let text = 'In Stock';

    if (!stockable) {
      variant = 'danger';
      text = 'Out of Stock';
    }

    return (
      <Badge pill bg={variant} className="position-absolute top-0 end-0 m-2">
        {text}
      </Badge>
    );
  };

  return (
    <Container>
      <ToastContainer />
      <h2 className="text-center my-4">Catalog</h2>
      {loading ? (
        <div className="text-center">
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>
      ) : (
        <Row>
          {catalog.map((item, index) => (
            <Col sm={12} md={6} lg={4} xl={3} key={item.id || index} className="mb-4">
              <Card className="position-relative">
                <Card.Header>
                  {stockBadge(item.itemVariationData?.stockable)}
                  <Image src={item.imageUrl || "https://via.placeholder.com/800x340"} fluid />
                </Card.Header>
                <Card.Body>
                  <Card.Title>{item.itemVariationData?.name || 'No Name'}</Card.Title>
                  <Card.Text>
                    ID: {item.id || 'No ID'}
                    <br />
                    {item.itemVariationData?.description || 'No Description'}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Catalog;
