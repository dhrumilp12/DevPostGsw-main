//We are not using this since we are using booking bulk retrive
// The RetrieveBooking component fetches and displays details for a single booking.
// It utilizes the `retrieveBooking` action to fetch booking data based on the bookingId obtained from the URL parameters.
// The component handles states for loading and error to provide feedback during the data fetching process.
// It shows a loading indicator when the data is being fetched and error messages if the fetch fails.

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
