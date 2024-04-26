import axios from 'axios';
import {
    CREATE_CATALOG_IMAGE_REQUEST,
    CREATE_CATALOG_IMAGE_SUCCESS,
    CREATE_CATALOG_IMAGE_FAILURE,
    UPDATE_CATALOG_IMAGE_REQUEST,
    UPDATE_CATALOG_IMAGE_SUCCESS,
    UPDATE_CATALOG_IMAGE_FAILURE
} from '../actionTypes';

// Function to create a catalog image
export const createCatalogImage = (url, formData) => async (dispatch) => {
    dispatch({ type: CREATE_CATALOG_IMAGE_REQUEST });
    try {
        const response = await axios.post(url, formData, );
        dispatch({ type: CREATE_CATALOG_IMAGE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_CATALOG_IMAGE_FAILURE, payload: error.response?.data?.error || error.message });
    }
};

// Function to update a catalog image
export const updateCatalogImage = (imageId, formData) => async (dispatch) => {
    dispatch({ type: UPDATE_CATALOG_IMAGE_REQUEST });
    try {
        // Notice: No Content-Type header should be explicitly set here
        const response = await axios.put(`/api/catalogs/images/${imageId}`, formData);
        dispatch({ type: UPDATE_CATALOG_IMAGE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_CATALOG_IMAGE_FAILURE, payload: error.response?.data?.error || error.message });
    }
};

