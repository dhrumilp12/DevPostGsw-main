import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails, confirmOrder } from './orderConfirmationAction';

const OrderConfirmation = ({ orderId }) => {
  const dispatch = useDispatch();
  const { orderDetails, loading, error, confirmationDetails } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(fetchOrderDetails(orderId));
  }, [dispatch, orderId]);

  const handleConfirmOrder = () => {
    dispatch(confirmOrder(orderId));
  };

  return (
    <div>
      <h1>Order Confirmation</h1>
      {loading && <p>Loading order details...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && orderDetails && (
        <div>
          <h2>Order Details</h2>
          <p>Order ID: {orderDetails.id}</p>
          {/* Display more order details here */}
          <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
      )}
      {confirmationDetails && (
        <div>
          <h2>Confirmation Details</h2>
          {/* Display confirmation details here */}
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
