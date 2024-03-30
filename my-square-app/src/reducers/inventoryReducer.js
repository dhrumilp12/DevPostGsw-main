//reducers/inventoryReducer

import { FETCH_INVENTORY_START, FETCH_INVENTORY_SUCCESS, FETCH_INVENTORY_FAILURE, ADJUST_INVENTORY } from '../action/inventoryActions';

const initialState = {
    loading: false,
    items: [],
    error: null 
};

const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INVENTORY_START:
            return { ...state, loading: true };
        case FETCH_INVENTORY_SUCCESS:
            return { ...state, loading: false, items: action.payload, error: null };
        case FETCH_INVENTORY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ADJUST_INVENTORY:
            // Implement logic to adjust the inventory (see note below)
            return {
                ...state,
                items: state.items.map(item => item.id === action.payload.itemId ? 
                    { ...item, count: item.count + action.payload.adjustment } : item)
            };
        default:
            return state;
    }
};

export default inventoryReducer;