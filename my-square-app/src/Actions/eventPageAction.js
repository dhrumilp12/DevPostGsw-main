// src/Actions/eventActions.js
import axios from 'axios';
export const FETCH_EVENTS_START = 'FETCH_EVENTS_START';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

const fetchEventsStart = () => ({
  type: FETCH_EVENTS_START,
});

const fetchEventsSuccess = (events) => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: events,
});

const fetchEventsFailure = (error) => ({
  type: FETCH_EVENTS_FAILURE,
  payload: error,
});

export const fetchEvents = () => async (dispatch) => {
  dispatch(fetchEventsStart());
  try {
    // Make an API call to your backend to fetch events
    const response = await axios.get('/api/events');
    dispatch(fetchEventsSuccess(response.data));
  } catch (error) {
    dispatch(fetchEventsFailure(error.message));
  }
};
