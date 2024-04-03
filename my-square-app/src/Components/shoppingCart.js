import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart, fetchCartSummary, updateCartSummary } from '../Actions/shoppingCartAction';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { cartItems, cartSummary, loading, error } = useSelector(state => state.shoppingCart);

  const handleAddItem = (item) => {
    dispatch(addItemToCart(item));
    // Optionally, update the cart summary here
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
    // Optionally, update the cart summary here
  };

  const handleFetchSummary = () => {
    dispatch(fetchCartSummary());
  };

  const handleUpdateSummary = (updatedSummary) => {
    dispatch(updateCartSummary(updatedSummary));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleFetchSummary}>Fetch Summary</button>
      {cartSummary && (
        <div>
          <p>Total Items: {cartSummary.totalItems}</p>
          <p>Total Price: ${cartSummary.totalPrice}</p>
          <button onClick={() => handleUpdateSummary({ ...cartSummary, discountApplied: true })}>Apply Discount</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
