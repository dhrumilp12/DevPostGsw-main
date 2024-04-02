// src/components/CustomerList.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// Import the action creators you might have
import { fetchCustomersStart, fetchCustomersSuccess, fetchCustomersFailure } from '../Actions/customerActions';

const CustomerList = ({ customersData, dispatchFetchCustomersStart, dispatchFetchCustomersSuccess, dispatchFetchCustomersFailure }) => {
    useEffect(() => {
        const fetchCustomers = async () => {
            // Dispatch an action indicating the start of customers fetching
            dispatchFetchCustomersStart();

            try {
                const response = await axios.get('http://localhost:3000/api/customers/list-customers');
                // Dispatch an action with the customers fetched successfully
                dispatchFetchCustomersSuccess(response.data);
            } catch (error) {
                console.error("Error fetching customers:", error);
                // Dispatch an error action here
                dispatchFetchCustomersFailure(error.message);
            }
        };

        fetchCustomers();
    }, [dispatchFetchCustomersStart, dispatchFetchCustomersSuccess, dispatchFetchCustomersFailure]);

    return (
        <div>
            <h2>Customer List</h2>
            {/* Replace with the properties you want to display */}
            {customersData.loading ? (
                <p>Loading...</p>
            ) : customersData.error ? (
                <p>Error: {customersData.error}</p>
            ) : customersData.customers.length > 0 ? (
                <ul>
                    {customersData.customers.map(customer => (
                        <li key={customer.id}>
                            {customer.name} ({customer.email})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No customers found.</p>
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    customersData: state.customers // Replace 'customers' with the actual state slice name
});

const mapDispatchToProps = (dispatch) => ({
    dispatchFetchCustomersStart: () => dispatch(fetchCustomersStart()),
    dispatchFetchCustomersSuccess: (customers) => dispatch(fetchCustomersSuccess(customers)),
    dispatchFetchCustomersFailure: (errorMessage) => dispatch(fetchCustomersFailure(errorMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
