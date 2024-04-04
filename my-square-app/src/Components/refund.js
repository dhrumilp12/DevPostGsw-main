import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { refundPayment } from '../Actions/paymentActions';

const Refund = () => {
    const [paymentId, setPaymentId] = useState('');
    const dispatch = useDispatch();

    const handleRefund = () => {
        dispatch(refundPayment(paymentId));
    };

    return (
        <div>
            <h2>Refund Payment</h2>
            <input
                type="text"
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
                placeholder="Enter Payment ID"
            />
            <button onClick={handleRefund}>Refund</button>
        </div>
    );
};

export default Refund;
