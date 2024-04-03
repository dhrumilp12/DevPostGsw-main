// src/components/Customers.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers } from '../Actions/customerAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner'; 

const Customers = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector(state => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) toast.error(`Error: ${error}`);

  return (
    <div>
      <ToastContainer />
      <h2>Customers</h2>
      {loading ? (
        <ThreeDots color="#00BFFF" height={20} width={20} />
      ) : (
        <ul>
          {customers.map(customer => (
            <li key={customer.id}>{customer.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Customers;
