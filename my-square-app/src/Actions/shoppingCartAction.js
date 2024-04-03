import axios from 'axios';

// Shopping cart action types
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const UPDATE_CART_SUMMARY_START = 'UPDATE_CART_SUMMARY_START';
export const UPDATE_CART_SUMMARY_SUCCESS = 'UPDATE_CART_SUMMARY_SUCCESS';
export const UPDATE_CART_SUMMARY_FAILURE = 'UPDATE_CART_SUMMARY_FAILURE';
export const FETCH_CART_SUMMARY_START = 'FETCH_CART_SUMMARY_START';
export const FETCH_CART_SUMMARY_SUCCESS = 'FETCH_CART_SUMMARY_SUCCESS';
export const FETCH_CART_SUMMARY_FAILURE = 'FETCH_CART_SUMMARY_FAILURE';

// Synchronous action creators for adding and removing items
export const addItemToCart = (item) => ({
  type: ADD_ITEM_TO_CART,
  payload: item,
});

export const removeItemFromCart = (itemId) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: itemId,
});

// Asynchronous action creators for fetching and updating cart summary
export const fetchCartSummary = () => async (dispatch) => {
  dispatch({ type: FETCH_CART_SUMMARY_START });
  try {
    const response = await axios.get('/api/cart/summary');
    dispatch({ type: FETCH_CART_SUMMARY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_CART_SUMMARY_FAILURE, payload: error.response ? error.response.data : error.message });
  }
};

export const updateCartSummary = (cartData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_SUMMARY_START });
  try {
    const response = await axios.put('/api/cart/summary', cartData);
    dispatch({ type: UPDATE_CART_SUMMARY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_CART_SUMMARY_FAILURE, payload: error.response ? error.response.data : error.message });
  }
};

// Be sure to define corresponding reducers to handle these actions and update the state.
