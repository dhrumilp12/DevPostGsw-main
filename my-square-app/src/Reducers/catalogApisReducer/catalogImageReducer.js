import {CATALOG_IMAGE_REQUEST, CATALOG_IMAGE_SUCCESS, CATALOG_IMAGE_FAIL} from '../../Actions/catalogApisActions/catalogImageActions';

const initialState = {
    loading: false,
    error: null,
    data: {}
  };
  
  const catalogImageReducer = (state = initialState, action) => {
    switch (action.type) {
      case CATALOG_IMAGE_REQUEST:
        return { ...state, loading: true, error: null };
      case CATALOG_IMAGE_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case CATALOG_IMAGE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default catalogImageReducer;
  