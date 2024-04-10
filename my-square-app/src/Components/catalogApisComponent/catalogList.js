import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCatalog } from '../../Actions/catalogApisAction/catalogListAction';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const Catalog = () => {
  const dispatch = useDispatch();
  const { catalog, loading, error } = useSelector((state) => state.catalogList);

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  if (error) {
    toast.error(`Error: ${error}`);
  }

  const stockBadge = (quantity) => {
    let variant = 'success';
    let text = 'In Stock';

    if (parseInt(quantity) <= 0) {
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
            <Col sm={12} md={6} lg={4} xl={3} key={`${item.catalogObjectId}-${index}`} className="mb-4">
              <Card className="position-relative">
                {stockBadge(item.quantity)}
                <Card.Body>
                  <Card.Title>{item?.item_data?.name || 'No Name'}</Card.Title>
                  <Card.Text>
                    ID: {item.catalogObjectId}
                    <br />
                    {item?.item_data?.description || 'No Description'}
                  </Card.Text>
                  {item?.item_data?.variations?.map((variation) => (
                    <div key={variation.id}>
                      <div>Variation Name: {variation?.item_variation_data?.name || 'No Variation Name'}</div>
                      <div>Price: {variation?.item_variation_data?.price_money?.amount || 'No Price'}</div>
                    </div>
                  ))}
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
