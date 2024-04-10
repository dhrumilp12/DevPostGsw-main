import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../Actions/shoppingCartAction';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector(state => state.shoppingCart);

  // Function to handle adding an item to the cart
  const handleAddItem = (itemId) => {
    // Assuming 'addItemToCart' action expects the item ID
    dispatch(addItemToCart(itemId));
  };

  // Function to handle removing an item from the cart
  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
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
            <button onClick={() => handleAddItem(item.id)}>Add</button> {/* Add button to add item */}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button> {/* Existing remove button */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
