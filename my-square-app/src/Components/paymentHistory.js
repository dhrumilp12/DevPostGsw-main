import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentsHistory } from '../Actions/paymentAction';

const PaymentHistory = () => {
    const dispatch = useDispatch();
    const { payments, loading, error } = useSelector(state => state.paymentHistory);

    useEffect(() => {
        dispatch(fetchPaymentsHistory());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Payment History</h2>
            <ul>
                {payments.map(payment => (
                    <li key={payment.id}>
                        {payment.amount} - {payment.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentHistory;
