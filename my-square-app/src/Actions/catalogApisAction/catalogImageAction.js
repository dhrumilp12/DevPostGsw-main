import axios from 'axios';
import {
    CREATE_CATALOG_IMAGE_REQUEST,
    CREATE_CATALOG_IMAGE_SUCCESS,
    CREATE_CATALOG_IMAGE_FAILURE,
    UPDATE_CATALOG_IMAGE_REQUEST,
    UPDATE_CATALOG_IMAGE_SUCCESS,
    UPDATE_CATALOG_IMAGE_FAILURE
} from '../actionTypes';

// Updated to include URL as a parameter
export const createCatalogImage = (url, formData) => async (dispatch) => {
    dispatch({ type: CREATE_CATALOG_IMAGE_REQUEST });
    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'  // This might be optional as axios sets it based on formData
            }
        });
        dispatch({ type: CREATE_CATALOG_IMAGE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_CATALOG_IMAGE_FAILURE, payload: error.response?.data?.error || error.message });
    }
};

export const updateCatalogImage = (imageId, idempotencyKey, imageData) => async (dispatch) => {
    const formData = new FormData();
    formData.append('image', imageData);
    formData.append('request', JSON.stringify({ idempotencyKey }));
    dispatch({ type: UPDATE_CATALOG_IMAGE_REQUEST });
    try {
        const response = await axios.put(`/api/catalogs/images/${imageId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'  // Ensure multipart form data content type
            }
        });
        dispatch({ type: UPDATE_CATALOG_IMAGE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_CATALOG_IMAGE_FAILURE, payload: error.response?.data?.error || error.message });
    }
};
