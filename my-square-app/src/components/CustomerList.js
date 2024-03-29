// src/components/CustomerList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch customer data when the component mounts
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/customers/list-customers');
                setCustomers(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
                // Handle error appropriately (e.g., display an error message)
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div>
            <h2>Customer List</h2>
            {customers.length > 0 ? (
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id}>
                            {customer.name} ({customer.email}) 
                            {/* Replace with the properties you want to display */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No customers found.</p>
            )}
        </div>
    );
};

export default CustomerList;
