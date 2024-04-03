// src/components/Loyalty.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoyaltyAccounts } from '../Actions/loyaltyAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner'; 

const Loyalty = () => {
  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector(state => state.loyalty);

  useEffect(() => {
    dispatch(fetchLoyaltyAccounts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) toast.error(`Error: ${error}`);
  return (
    <div>
        <ToastContainer />
      <h2>Loyalty Accounts</h2>
      {loading ? (
        <ThreeDots color="#00BFFF" height={20} width={20} />
      ) : (
        <ul>
          {accounts.map(account => (
            <li key={account.id}>{account.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Loyalty;
