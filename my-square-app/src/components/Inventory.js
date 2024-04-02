import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// Import action creators for inventory actions
import { 
  fetchInventoryStart, 
  fetchInventorySuccess, 
  fetchInventoryFailure,
  adjustInventory
} from '../Actions/inventoryActions';

const Inventory = ({ inventoryData, dispatchFetchInventoryStart, dispatchFetchInventorySuccess, dispatchFetchInventoryFailure, dispatchAdjustInventory }) => {
    useEffect(() => {
        const fetchInventory = async () => {
            dispatchFetchInventoryStart();

            try {
                const response = await axios.get('http://localhost:3000/api/inventory/list');
                dispatchFetchInventorySuccess(response.data);
            } catch (error) {
                console.error("Error fetching inventory:", error);
                dispatchFetchInventoryFailure(error.message);
            }
        };

        fetchInventory();
    }, [dispatchFetchInventoryStart, dispatchFetchInventorySuccess, dispatchFetchInventoryFailure]);


    return (
        <div>
            <h2>Inventory Management</h2>
            {inventoryData.loading ? (
                <p>Loading...</p>
            ) : inventoryData.error ? (
                <p>Error: {inventoryData.error}</p>
            ) : inventoryData.items.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData.items.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                                <td>
                                    <button onClick={() => dispatchAdjustInventory(item.id, 1)}>Increase</button>
                                    <button onClick={() => dispatchAdjustInventory(item.id, -1)}>Decrease</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No inventory items found.</p>
            )}
        </div>
    );
};


const mapStateToProps = (state) => ({
    inventoryData: state.inventory // Replace 'inventory' with the actual state slice name
});

const mapDispatchToProps = (dispatch) => ({
    dispatchFetchInventoryStart: () => dispatch(fetchInventoryStart()),
    dispatchFetchInventorySuccess: (items) => dispatch(fetchInventorySuccess(items)),
    dispatchFetchInventoryFailure: (errorMessage) => dispatch(fetchInventoryFailure(errorMessage)),
    dispatchAdjustInventory: (itemId, adjustment) => dispatch(adjustInventory(itemId, adjustment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);

