import axios from 'axios';
import {
  SEARCH_AVAILABILITY_START,
  SEARCH_AVAILABILITY_SUCCESS,
  SEARCH_AVAILABILITY_FAILURE,
} from '../actionTypes';

// Action to signify the start of availability search
export const searchAvailabilityStart = () => ({
  type: SEARCH_AVAILABILITY_START,
});

// Action to handle successful search for availability
export const searchAvailabilitySuccess = (availabilities) => ({
  type: SEARCH_AVAILABILITY_SUCCESS,
  payload: availabilities,
});

// Action to handle failure in searching for availability
export const searchAvailabilityFailure = (error) => ({
  type: SEARCH_AVAILABILITY_FAILURE,
  payload: error,
});

// Thunk function to search availability based on criteria
export const searchAvailability = (searchCriteria) => async (dispatch) => {
  dispatch(searchAvailabilityStart());
  try {
    const response = await axios.post('/api/bookings/search-availability', searchCriteria);
    dispatch(searchAvailabilitySuccess(response.data));
  } catch (error) {
    dispatch(searchAvailabilityFailure(error.message));
  }
};
