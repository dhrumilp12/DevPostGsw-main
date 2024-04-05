import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentDetails } from '../Actions/paymentAction'; // Adjust the path as necessary

const PaymentDetails = ({ paymentId }) => {
    const dispatch = useDispatch();
    const { paymentDetails, loading, error } = useSelector(state => state.paymentDetails);

    useEffect(() => {
        if (paymentId) {
            dispatch(fetchPaymentDetails(paymentId));
        }
    }, [dispatch, paymentId]);

    if (loading) return <div>Loading payment details...</div>;
    if (error) return <div>Error fetching payment details: {error}</div>;

    return (
        <div>
            <h2>Payment Details</h2>
            {/* Display payment details */}
            <p>Amount: {paymentDetails.amount}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default PaymentDetails;
