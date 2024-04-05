import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers } from '../../Actions/customerApisAction/customerListAction';

const CustomerList = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector(state => state.customerList);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.givenName} {customer.familyName} - {customer.emailAddress}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
