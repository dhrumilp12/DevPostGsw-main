import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../Actions/bookingApisAction/bookingListAction';
import { Container, ListGroup } from 'react-bootstrap';

const BookingsList = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector(state => state.bookingsList);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <Container>
      <h2>Bookings List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ListGroup>
          {bookings.map(booking => (
            <ListGroup.Item key={booking.id}>
              Booking ID: {booking.id} - Customer ID: {booking.customer_id}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default BookingsList;
