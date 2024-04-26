import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCatalog, sortCatalog } from '../../Actions/catalogApisAction/catalogListAction';
import { createCatalogImage} from '../../Actions/catalogApisAction/catalogImageAction'
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import { Modal,Container, Row, Col, Card, Badge, Image , Button, Carousel, Form,} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { FaSearch, FaSortAmountDown, FaUpload} from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";
import BulkRetrieveBookingsForm from '../bookingApisComponent/bookingBulkRetrive';
import SearchAvailabilityForm from '../bookingApisComponent/bookingSearchAvailability';

const Catalog = () => {
  const dispatch = useDispatch();
  const { catalog, loading, error } = useSelector(state => state.catalogList);
  const [showSearchAvailabilityModal, setShowSearchAvailabilityModal] = useState(false);
  const [showBulkRetrieveModal, setShowBulkRetrieveModal] = useState(false);
  const user = useSelector((state) => state.registerLogin.user?.user); // Access user details from the state
  const [sortKey, setSortKey] = useState('name');
  const [selectedFile, setSelectedFile] = useState(null);
  const[objectId, setObjectId] = useState(null);

  
  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleSortChange = (e) => {
    const newSortKey = e.target.value; 
    setSortKey(newSortKey); 
    dispatch(sortCatalog(newSortKey)); 
  };
  const handleFileChange = (file, itemId) => {
    setSelectedFile(file);
    setObjectId(itemId);
  };
  const handleClose = () => {
    setShowSearchAvailabilityModal(false);
    setShowBulkRetrieveModal(false);
  };

  const handleUploadImage = () => {
    if (!selectedFile || !objectId) {
      toast.error('File or item ID missing');
      return;
    }

    
    
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('objectId', objectId);
    
    const url = `/api/catalogs/images?objectId=${objectId}`;
    dispatch(createCatalogImage(url, formData));
    
    setSelectedFile(null);
    setObjectId(null);
    };

  // Function to display top three featured items in a carousel
  const renderFeaturedItems = () => (
    <Carousel className="carousel-featured mb-4" indicators={false} nextLabel="" prevLabel="">
      {catalog.slice(0, 3).map(item => (
        <Carousel.Item key={item.id}>
          <Image
            className="d-block w-100"
            src={item.imageUrl || "https://via.placeholder.com/800x340"}
            alt="Featured slide"
            style={{ height: '600px', objectFit: 'cover' }} // Set a fixed height for better control over appearance
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
            <h3 className="text-white">{item.itemVariationData?.name}</h3>
            <p className="text-white d-none d-md-block">{item.itemVariationData?.description}</p>
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
    <Container fluid style={{ backgroundColor: '#b0b8c5', minHeight: '100vh', padding: '2rem' }}>
      <ToastContainer />
      <animated.div style={fade}>
        <div 
          className="text-center my-4 p-4" 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.85)', 
            borderRadius: '15px', 
            color: '#1a2035',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // subtle shadow
            fontSize: '1rem', // responsive font size
            lineHeight: '1.6' // line height for better readability
          }}
          >
          <h2 className="display-6" style={{ marginBottom: '0.5rem' }}>Good {getGreetingTime()}, {user ? user.givenName : 'Guest'}! Explore our events!</h2>
          <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>We’re thrilled to have you here and can’t wait for you to explore our curated selection of events. Find your next favorite!</p>
        </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <ThreeDots color="#1a2035" height={80} width={80} />
        </div>
      ) : (
        <>
          {renderFeaturedItems()}
          
          <Row className="mb-4 align-items-center justify-content-between">
            <Col xs={12} md={4} lg={3}>
              <Form.Group controlId="sortControl">
                <Form.Label className="me-2">Sort By:</Form.Label>
                <Form.Select
                  aria-label="Sort by"
                  value={sortKey}
                  onChange={handleSortChange}
                  className="py-1" // Smaller padding for a more compact look
                  style={{ color: '#1a2035', minWidth: '180px' }} // Ensure dropdown does not become too small on narrower screens
                >
                  <option value="name">Name</option>
                  <option value="priceLowHigh">Price: Low to High </option>
                  <option value="priceHighLow">Price: High to Low </option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} lg={3} className="mt-3 mt-md-0"> {/* Adjustments for top margin on smaller screens */}
              <Button variant="primary" onClick={() => setShowSearchAvailabilityModal(true)} className="w-100">
                Search Booking Availability <FaSearch />
              </Button>
              <Modal show={showSearchAvailabilityModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Search Booking Availability</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <SearchAvailabilityForm />
                </Modal.Body>
              </Modal>
            </Col>

            <Col xs={12} md={4} lg={3} className="mt-3 mt-md-0"> {/* Consistent spacing and alignment for the second button */}
              <Button variant="secondary" onClick={() => setShowBulkRetrieveModal(true)} className="w-100">
                Bulk Retrieve Bookings <FaSortAmountDown />
              </Button>
              <Modal show={showBulkRetrieveModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                  <Modal.Title>Bulk Retrieve Bookings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <BulkRetrieveBookingsForm />
                </Modal.Body>
              </Modal>
            </Col>
          </Row>

         <Row xs={1} md={2} lg={3} className="g-4">
          {catalog.map((item, index) => (
            <Col sm={12} md={6} lg={4} xl={3} key={item.id || index} className="mb-4" >
              <Card className="shadow-lg border-0 h-100">
                <Card.Header className="p-0 overflow-hidden">
                  <Image src={item.imageUrl || "https://via.placeholder.com/800x340"} alt="Catalog item" className="w-100" style={{ height: '200px', objectFit: 'cover' }} />
                  {stockBadge(item.itemVariationData?.stockable)}
                  
                   {!item.imageUrl && (
                    <>
                      <input type="file" onChange={(e) => handleFileChange(e.target.files[0], item.id)} hidden id={`file-upload-${item.id}`} />
                      <label htmlFor={`file-upload-${item.id}`} className="btn btn-sm btn-secondary">Upload Image <FaUpload /></label>
                    </>
                  )}
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
                    <Button as={Link} to={`/catalogSearchItem/${item.id}`} variant="outline-primary" className="btn-sm flex-grow-1 me-2">Details <FcViewDetails /></Button>
                    <Button as={Link} to={`/catalogDeleteItem/${item.id}`} variant="outline-danger" className="btn-sm flex-grow-1">Delete <MdDelete /></Button>
                    { (!item.imageUrl) && <Button onClick={handleUploadImage} variant="success" className="mt-2">Upload <FaUpload /></Button>}
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





