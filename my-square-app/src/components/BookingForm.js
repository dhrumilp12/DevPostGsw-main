import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../Actions/bookingAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';

const BookingForm = () => {
  const [bookingDetails, setBookingDetails] = useState({
    customerId: '',
    startAt: '',
    locationId: '',
    teamMemberId: '',
    serviceVariationId: '',
    serviceVariationVersion: '',
  });
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.booking);

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking(bookingDetails));
  };
  if (error) {
    toast.error(`Error: ${error}`);
  }

  return (
    <div>
    <ToastContainer />
      <h2>Create Booking</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerId"
          value={bookingDetails.customerId}
          onChange={handleChange}
          placeholder="Customer ID"
        />
        <input
          type="text"
          name="startAt"
          value={bookingDetails.startAt}
          onChange={handleChange}
          placeholder="Start At (e.g., 2020-11-26T13:00:00Z)"
        />
        <input
          type="text"
          name="locationId"
          value={bookingDetails.locationId}
          onChange={handleChange}
          placeholder="Location ID"
        />
        <input
          type="text"
          name="teamMemberId"
          value={bookingDetails.teamMemberId}
          onChange={handleChange}
          placeholder="Team Member ID"
        />
        <input
          type="text"
          name="serviceVariationId"
          value={bookingDetails.serviceVariationId}
          onChange={handleChange}
          placeholder="Service Variation ID"
        />
        <input
          type="text"
          name="serviceVariationVersion"
          value={bookingDetails.serviceVariationVersion}
          onChange={handleChange}
          placeholder="Service Variation Version"
        />
        <button type="submit" disabled={loading}>Create Booking</button>
        {loading ? (
            <ThreeDots color="#00BFFF" height={20} width={20} />
          ) : (
            'Create Booking'
          )}
      </form>
    </div>
  );
};

export default BookingForm;
