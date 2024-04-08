import axios from 'axios';
import {
  SEARCH_AVAILABILITY_START,
  SEARCH_AVAILABILITY_SUCCESS,
  SEARCH_AVAILABILITY_FAILURE,
} from '../actionTypes';

export const searchAvailabilityStart = () => ({
  type: SEARCH_AVAILABILITY_START,
});

export const searchAvailabilitySuccess = (availabilities) => ({
  type: SEARCH_AVAILABILITY_SUCCESS,
  payload: availabilities,
});

export const searchAvailabilityFailure = (error) => ({
  type: SEARCH_AVAILABILITY_FAILURE,
  payload: error,
});

export const searchAvailability = (searchCriteria) => async (dispatch) => {
  dispatch(searchAvailabilityStart());
  try {
    const response = await axios.post('/api/bookings/search-availability', searchCriteria);
    dispatch(searchAvailabilitySuccess(response.data.availabilities));
  } catch (error) {
    dispatch(searchAvailabilityFailure(error.message));
  }
};
