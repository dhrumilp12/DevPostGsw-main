//Not working, will work on it.
// Manages the shopping cart's state including adding and removing items, fetching and updating the cart summary. It tracks loading states and errors for operations related to the cart's summary.

import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    UPDATE_CART_SUMMARY_START,
    UPDATE_CART_SUMMARY_SUCCESS,
    UPDATE_CART_SUMMARY_FAILURE,
    FETCH_CART_SUMMARY_START,
    FETCH_CART_SUMMARY_SUCCESS,
    FETCH_CART_SUMMARY_FAILURE,
  } from '../Actions/shoppingCartAction.js';
  
  const initialState = {
    cartItems: [],
    cartSummary: null,
    loading: false,
    error: null,
  };
  
  const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ITEM_TO_CART:
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      case REMOVE_ITEM_FROM_CART:
        return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload) };
      case FETCH_CART_SUMMARY_START:
      case UPDATE_CART_SUMMARY_START:
        return { ...state, loading: true, error: null };
      case FETCH_CART_SUMMARY_SUCCESS:
      case UPDATE_CART_SUMMARY_SUCCESS:
        return { ...state, cartSummary: action.payload, loading: false };
      case FETCH_CART_SUMMARY_FAILURE:
      case UPDATE_CART_SUMMARY_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export default shoppingCartReducer;
  