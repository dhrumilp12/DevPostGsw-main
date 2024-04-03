import {
    FETCH_EVENTS_START,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_FAILURE,
  } from './eventPageAction';
  
  const initialState = {
    events: [],
    loading: false,
    error: null,
  };
  
  const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EVENTS_START:
        return { ...state, loading: true, error: null };
      case FETCH_EVENTS_SUCCESS:
        return { ...state, events: action.payload, loading: false };
      case FETCH_EVENTS_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export default eventReducer;
  