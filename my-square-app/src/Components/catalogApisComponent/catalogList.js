import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCatalog } from '../../Actions/catalogApisAction/catalogListAction';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { Container, Row, Col, Card, Badge, Image , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Catalog = () => {
  const dispatch = useDispatch();
  const { catalog, loading, error } = useSelector(state => state.catalogList);

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const formatPrice = (priceMoney) => {
    if (!priceMoney || !priceMoney.amount) return 'Price Not Available';
    const amount = (priceMoney.amount / 100).toFixed(2);
    return `${priceMoney.currency} ${amount}`;
  };

  const formatDuration = (duration) => {
    if (!duration) return 'Not Provided';
    const minutes = Math.round(duration / 60000);
    return `${minutes} min`;
  };

  const sellableStatus = (sellable) => sellable ? 'Sellable' : 'Not Sellable';

  const stockBadge = (stockable) => {
    let variant = stockable ? 'success' : 'danger';
    let text = stockable ? 'In Stock' : 'Out of Stock';
    return <Badge pill bg={variant} className="position-absolute top-0 end-0 m-2">{text}</Badge>;
  };

  return (
    <Container >
      <ToastContainer />
      <h2 className="text-center my-4 fw-bold">Catalog</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <ThreeDots color="#1a2035" height={80} width={80} />
        </div>
      ) : (
        <Row>
          {catalog.map((item, index) => (
            <Col sm={12} md={6} lg={4} xl={3} key={item.id || index} className="mb-4" >
              <Card className="shadow-lg border-0 h-100">
                <Card.Header className="p-0 overflow-hidden">
                  <Image src={item.imageUrl || "https://via.placeholder.com/800x340"} alt="Catalog item" className="w-100" style={{ height: '200px', objectFit: 'cover' }} />
                  {stockBadge(item.itemVariationData?.stockable)}
                </Card.Header>
                <Card.Body>
                  <Card.Title style={{ color: '#1a2035' }}>{item.itemVariationData?.name || 'No Name'}</Card.Title>
                  <Card.Text style={{ color: '#1a2035' }}>
                    ID: {item.id || 'No ID'}
                    <br />
                    Price: {formatPrice(item.itemVariationData?.priceMoney)}
                    <br />
                    Duration: {formatDuration(item.itemVariationData?.serviceDuration)}
                    <br />
                    Status: {sellableStatus(item.itemVariationData?.sellable)}
                  </Card.Text>
                  <div className="d-flex justify-content-between mt-3">
                    <Button as={Link} to={`/catalogSearchItem/${item.id}`} variant="outline-primary" className="btn-sm flex-grow-1 me-2">Details</Button>
                    <Button as={Link} to={`/catalogDeleteItem/${item.id}`} variant="outline-danger" className="btn-sm flex-grow-1">Delete</Button>
                  </div>
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
