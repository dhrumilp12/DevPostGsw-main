import axios from 'axios';

// Service details action types
export const FETCH_SERVICE_DETAILS_START = 'FETCH_SERVICE_DETAILS_START';
export const FETCH_SERVICE_DETAILS_SUCCESS = 'FETCH_SERVICE_DETAILS_SUCCESS';
export const FETCH_SERVICE_DETAILS_FAILURE = 'FETCH_SERVICE_DETAILS_FAILURE';
export const UPDATE_SERVICE_DETAILS_START = 'UPDATE_SERVICE_DETAILS_START';
export const UPDATE_SERVICE_DETAILS_SUCCESS = 'UPDATE_SERVICE_DETAILS_SUCCESS';
export const UPDATE_SERVICE_DETAILS_FAILURE = 'UPDATE_SERVICE_DETAILS_FAILURE';
export const DELETE_SERVICE_START = 'DELETE_SERVICE_START';
export const DELETE_SERVICE_SUCCESS = 'DELETE_SERVICE_SUCCESS';
export const DELETE_SERVICE_FAILURE = 'DELETE_SERVICE_FAILURE';

// Fetch service details
const fetchServiceDetailsStart = () => ({
  type: FETCH_SERVICE_DETAILS_START,
});

const fetchServiceDetailsSuccess = (serviceDetails) => ({
  type: FETCH_SERVICE_DETAILS_SUCCESS,
  payload: serviceDetails,
});

const fetchServiceDetailsFailure = (error) => ({
  type: FETCH_SERVICE_DETAILS_FAILURE,
  payload: error,
});

export const fetchServiceDetails = (serviceId) => async (dispatch) => {
  dispatch(fetchServiceDetailsStart());
  try {
    const response = await axios.get(`/api/services/${serviceId}`);
    dispatch(fetchServiceDetailsSuccess(response.data));
  } catch (error) {
    dispatch(fetchServiceDetailsFailure(error.response ? error.response.data : error.message));
  }
};

// Update service details
const updateServiceDetailsStart = () => ({
  type: UPDATE_SERVICE_DETAILS_START,
});

const updateServiceDetailsSuccess = (serviceDetails) => ({
  type: UPDATE_SERVICE_DETAILS_SUCCESS,
  payload: serviceDetails,
});

const updateServiceDetailsFailure = (error) => ({
  type: UPDATE_SERVICE_DETAILS_FAILURE,
  payload: error,
});

export const updateServiceDetails = (serviceId, serviceData) => async (dispatch) => {
  dispatch(updateServiceDetailsStart());
  try {
    const response = await axios.put(`/api/services/${serviceId}`, serviceData);
    dispatch(updateServiceDetailsSuccess(response.data));
  } catch (error) {
    dispatch(updateServiceDetailsFailure(error.response ? error.response.data : error.message));
  }
};

// Delete service
const deleteServiceStart = () => ({
  type: DELETE_SERVICE_START,
});

const deleteServiceSuccess = (serviceId) => ({
  type: DELETE_SERVICE_SUCCESS,
  payload: serviceId,
});

const deleteServiceFailure = (error) => ({
  type: DELETE_SERVICE_FAILURE,
  payload: error,
});

export const deleteService = (serviceId) => async (dispatch) => {
  dispatch(deleteServiceStart());
  try {
    await axios.delete(`/api/services/${serviceId}`);
    dispatch(deleteServiceSuccess(serviceId));
  } catch (error) {
    dispatch(deleteServiceFailure(error.response ? error.response.data : error.message));
  }
};

// Make sure to handle the corresponding actions in your reducers
