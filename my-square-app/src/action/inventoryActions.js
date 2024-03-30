// src/redux/actions/inventoryActions.js
export const FETCH_INVENTORY_START = 'FETCH_INVENTORY_START';
export const FETCH_INVENTORY_SUCCESS = 'FETCH_INVENTORY_SUCCESS';
export const FETCH_INVENTORY_FAILURE = 'FETCH_INVENTORY_FAILURE';
export const ADJUST_INVENTORY = 'ADJUST_INVENTORY';

export const fetchInventoryStart = () => ({
    type: FETCH_INVENTORY_START
});

export const fetchInventorySuccess = (items) => ({
    type: FETCH_INVENTORY_SUCCESS,
    payload: items 
});

export const fetchInventoryFailure = (error) => ({
    type: FETCH_INVENTORY_FAILURE,
    payload: error 
});

export const adjustInventory = (itemId, adjustment) => ({
    type: ADJUST_INVENTORY,
    payload: { itemId, adjustment }
});
