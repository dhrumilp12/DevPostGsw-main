import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCatalog, sortCatalog } from '../../Actions/catalogApisAction/catalogListAction';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { Container, Row, Col, Card, Badge, Image , Button, Carousel, Form,} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const Catalog = () => {
  const dispatch = useDispatch();
  const { catalog, loading, error } = useSelector(state => state.catalogList);
  const user = useSelector((state) => state.registerLogin.user.user); // Access user details from the state
  const [sortKey, setSortKey] = useState('name');

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch, sortKey]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleSortChange = (e) => {
    setSortKey(e.target.value);
    dispatch(sortCatalog(e.target.value));
  };

  // Function to display top three featured items in a carousel
  const renderFeaturedItems = () => (
    <Carousel interval={3000} pause='hover'>
      {catalog.slice(0, 3).map(item => (
        <Carousel.Item key={item.id}>
          <img
            className="d-block w-100"
            src={item.imageUrl || "https://via.placeholder.com/800x340"}
            alt="Featured slide"
          />
          <Carousel.Caption>
            <h3>{item.itemVariationData?.name}</h3>
            <p>{item.itemVariationData?.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
  
  const formatPrice = (priceMoney) => priceMoney ? `${priceMoney.currency} ${(priceMoney.amount / 100).toFixed(2)}` : 'Price Not Available';

  const formatDuration = (duration) => duration ? `${Math.round(duration / 60000)} min` : 'Not Provided';

  const sellableStatus = (sellable) => sellable ? 'Sellable' : 'Not Sellable';

  const stockBadge = (stockable) => {
    let variant = stockable ? 'success' : 'danger';
    let text = stockable ? 'In Stock' : 'Out of Stock';
    return <Badge pill bg={variant} className="position-absolute top-0 end-0 m-2">{text}</Badge>;
  };

  const getGreetingTime = (d = new Date()) => {
    const hour = d.getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  return (
    <Container >
      <ToastContainer />
      <animated.div style={fade}>
       <h2 className="text-center my-4">Good {getGreetingTime()}, {user ? user.givenName : 'Guest'}, explore our Catalog!</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <ThreeDots color="#1a2035" height={80} width={80} />
        </div>
      ) : (
        <>
          {renderFeaturedItems()}
          <Form className="d-flex justify-content-end my-3">
              <Form.Label className="me-2" column sm="auto">Sort By:</Form.Label>
              <Form.Control as="select" value={sortKey} onChange={handleSortChange} custom>
                <option value="name">Name</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
              </Form.Control>
            </Form>
         <Row xs={1} md={2} lg={3} className="g-4">
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
        </>
      )}
      </animated.div>
    </Container>
  );
};

export default Catalog;
