// src/components/Payment.js
import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [paymentData, setPaymentData] = useState({
        amount: 0,
        customerId: '',
        cardNonce: '' 
        // Add other relevant payment data you need
    });

    const handleChange = (event) => {
        setPaymentData({
            ...paymentData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // IMPORTANT: Validate payment data here! Client-side only is NOT enough

            const response = await axios.post('http://localhost:3000/api/payments/process-payment', paymentData);
            console.log(response.data);
            // Handle successful payment (e.g., display receipt, update booking if relevant)
        } catch (error) {
            console.error('Payment Error:', error); 
            // Handle errors (e.g., display error message to user)
        }
    };

    return (
        <div>
            <h2>Process Payment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" name="amount" value={paymentData.amount} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="customerId">Customer ID:</label>
                    <input type="text" id="customerId" name="customerId" value={paymentData.customerId} onChange={handleChange} />
                </div>
                {/* 
                    IMPORTANT: Don't render card details entry form directly here. 
                    See below for guidance on integrating Square's payment form securely.
                */}
                <button type="submit">Process Payment</button>
            </form>
        </div>
    );
};

export default Payment;
