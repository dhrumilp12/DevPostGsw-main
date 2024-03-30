import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// Import action creators for payment actions
import { 
  processPaymentStart, 
  processPaymentSuccess, 
  processPaymentFailure
} from '../action/paymentActions';

const Payment = ({
  dispatchProcessPaymentStart,
  dispatchProcessPaymentSuccess,
  dispatchProcessPaymentFailure
}) => {
    const [paymentData, setPaymentData] = useState({
        amount: 0,
        customerId: '',
        cardNonce: '' 
        // Add other relevant payment data you need
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Dispatch the process payment start action
        dispatchProcessPaymentStart();

        try {
            // Here you would normally use a payment token instead of card details
            const response = await axios.post('http://localhost:3000/api/payments/process-payment', paymentData);
            // Dispatch the process payment success action
            dispatchProcessPaymentSuccess(response.data);
            // Handle successful payment (e.g., display receipt, update booking if relevant)
        } catch (error) {
            console.error('Payment Error:', error);
            // Dispatch the process payment failure action
            dispatchProcessPaymentFailure(error.message);
            // Handle errors (e.g., display error message to user)
        }
    };

    return (
        <div>
            <h2>Process Payment</h2>
            <form onSubmit={handleSubmit}>
                {/* Your form inputs and submit button here */}
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchProcessPaymentStart: () => dispatch(processPaymentStart()),
    dispatchProcessPaymentSuccess: (paymentInfo) => dispatch(processPaymentSuccess(paymentInfo)),
    dispatchProcessPaymentFailure: (error) => dispatch(processPaymentFailure(error))
});

// If there's no state to map, you can just pass null for mapStateToProps
export default connect(null, mapDispatchToProps)(Payment);
