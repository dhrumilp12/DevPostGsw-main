import axios from 'axios';
import{
CREATE_CATALOG_IMAGE_REQUEST ,
 CREATE_CATALOG_IMAGE_SUCCESS,
 CREATE_CATALOG_IMAGE_FAILURE,
 UPDATE_CATALOG_IMAGE_REQUEST,
 UPDATE_CATALOG_IMAGE_SUCCESS ,
 UPDATE_CATALOG_IMAGE_FAILURE} from '../actionTypes';

// Action to create a catalog image
export const createCatalogImage = (idempotencyKey, objectId, imageData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CATALOG_IMAGE_REQUEST });
        const formData = new FormData();
        formData.append('image', imageData);
        formData.append('request', JSON.stringify({ idempotencyKey, objectId }));
        const response = await axios.post('/api/catalogs/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({ type: CREATE_CATALOG_IMAGE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_CATALOG_IMAGE_FAILURE, payload: error.response?.data?.error || error.message });
    }
};



// Action to update a catalog image
export const updateCatalogImage = (imageId, idempotencyKey, imageData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATALOG_IMAGE_REQUEST });
        const formData = new FormData();
        formData.append('image', imageData);
        formData.append('request', JSON.stringify({ idempotencyKey }));
        const response = await axios.put(`/api/catalogs/images/${imageId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({ type: UPDATE_CATALOG_IMAGE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_CATALOG_IMAGE_FAILURE, payload: error.response?.data?.error || error.message });
    }
};
