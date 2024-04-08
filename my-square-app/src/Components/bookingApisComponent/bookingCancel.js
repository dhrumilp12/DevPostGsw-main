import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking } from '../../Actions/bookingApisAction/bookingCancelAction';
import { Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CancelBookingButton = ({ bookingId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.bookingCancel);

  const handleCancel = () => {
    dispatch(cancelBooking(bookingId));
  };

  if (error) {
    toast.error(`Error: ${error}`);
  }

  return (
    <>
      <ToastContainer />
      <Button variant="danger" onClick={handleCancel} disabled={loading}>
        {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Cancel Booking'}
      </Button>
    </>
  );
};

export default CancelBookingButton;
