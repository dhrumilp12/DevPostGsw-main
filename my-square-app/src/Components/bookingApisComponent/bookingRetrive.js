import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveBooking } from '../../Actions/bookingApisAction/bookingRetriveAction';
import { useParams } from 'react-router-dom';

const RetrieveBooking = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const { booking, loading, error } = useSelector((state) => state.bookingDetails);

  useEffect(() => {
    dispatch(retrieveBooking(bookingId));
  }, [dispatch, bookingId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Booking Details</h2>
      <p>ID: {booking.id}</p>
      <p>Status: {booking.status}</p>
      <p>Start At: {booking.start_at}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default RetrieveBooking;
