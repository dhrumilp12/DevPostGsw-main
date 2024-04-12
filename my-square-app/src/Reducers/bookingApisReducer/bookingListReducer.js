import {
  FETCH_BOOKINGS_START,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_FAILURE,
  CANCEL_BOOKING_SUCCESS // Assuming this action type is correctly dispatched on cancellation success
} from '../../Actions/actionTypes';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
      };
    case CANCEL_BOOKING_SUCCESS:
      // Update the status of the cancelled booking
      const updatedBookings = state.bookings.map(booking => {
        if (booking.id === action.payload.id) { // Ensure the id is passed in the payload
          return { ...booking, status: 'CANCELLED_BY_SELLER' };
        }
        return booking;
      });
      return {
        ...state,
        bookings: updatedBookings,
      };
    case FETCH_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookingsListReducer;
