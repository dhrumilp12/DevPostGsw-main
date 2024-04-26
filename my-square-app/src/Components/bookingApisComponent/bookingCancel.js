import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking } from '../../Actions/bookingApisAction/bookingCancelAction';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CancelBookingButton = ({ bookingId, bookingVersion, bookingStatus }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.bookingCancel);

    const handleCancel = async () => {
        console.log(`Attempting to cancel: ID ${bookingId} with status ${bookingStatus} and version ${bookingVersion}`);

        if (bookingStatus === 'CANCELLED_BY_SELLER') {
            console.log('Booking already cancelled, no action taken.');
            toast.info("This booking has already been cancelled.");
            return;
        }

        if (bookingVersion !== undefined && Number.isInteger(Number(bookingVersion))) {
            try {
                await dispatch(cancelBooking(bookingId, Number(bookingVersion)));
                toast.success("Booking cancelled successfully.");
            } catch (error) {
                console.error('Error cancelling booking:', error);
                toast.error(`Error cancelling booking: ${error.message}`);
            }
        } else {
            toast.error('Booking version is missing or not a number.');
        }
    };

    return (
        <>
            
            <Button variant="danger" onClick={handleCancel} disabled={loading || bookingStatus === 'CANCELLED_BY_SELLER'}>
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Cancel Booking'}
            </Button>
        </>
    );
};

export default CancelBookingButton;
