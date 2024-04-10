import axios from 'axios';
import {
    CATALOG_IMAGE_UPDATE_REQUEST,
    CATALOG_IMAGE_UPDATE_SUCCESS,
    CATALOG_IMAGE_UPDATE_FAILURE,
  } from '../actionTypes';
  

export const catalogImageUpdate = (id, image) => async (dispatch) => {
    try {
        dispatch({ type: CATALOG_IMAGE_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const formData = new FormData();
        formData.append('image', image);

        const { data } = await axios.post(`/api/catalogs/${id}/image`, formData, config);

        dispatch({ type: CATALOG_IMAGE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CATALOG_IMAGE_UPDATE_FAILURE, payload: error.message });
    }
}