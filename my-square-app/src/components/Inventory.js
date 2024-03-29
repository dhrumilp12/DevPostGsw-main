// src/components/Inventory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [adjustmentAmount, setAdjustmentAmount] = useState(0); 

    // Fetch inventory on component mount
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/inventory/list');
                setInventoryItems(response.data);
            } catch (error) {
                console.error("Error fetching inventory:", error);
                // Display an error message to the user
            }
        };

        fetchInventory();
    }, []);

    // Handle new item input change
    const handleNewItemChange = (event) => {
        setNewItemName(event.target.value);
    };

    // Handle adjustment amount change
    const handleAdjustmentChange = (event) => {
        setAdjustmentAmount(parseInt(event.target.value, 10) || 0);
    };

    // Add new item
    const handleAddItem = async () => {
        // ... (Implement adding items - API call, state update)
    };

    // Adjust inventory count for an item
    const handleAdjustInventory = async (itemId, direction) => {
        // ... (Implement inventory adjustment - API call, state update)
    };

    return (
        <div>
            <h2>Inventory Management</h2>

            {/* Add new item section */}
            <div>
                <input type="text" placeholder="Item Name" value={newItemName} onChange={handleNewItemChange} />
                <button onClick={handleAddItem}>Add Item</button>
            </div>

            {/* Inventory list */}
            {inventoryItems.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td> {/* Replace with relevant property */}
                                <td>{item.count}</td> {/* Replace with relevant property */}
                                <td>
                                    <input type="number" value={adjustmentAmount} onChange={handleAdjustmentChange} />
                                    <button onClick={() => handleAdjustInventory(item.id, 'increase')}>+</button>
                                    <button onClick={() => handleAdjustInventory(item.id, 'decrease')}>-</button>
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

export default Inventory;
