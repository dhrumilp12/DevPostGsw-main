// src/components/Inventory.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory } from '../Actions/inventoryAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';

const Inventory = () => {
  const dispatch = useDispatch();
  const { inventory, loading, error } = useSelector(state => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) toast.error(`Error: ${error}`);

  return (
    <div>
    <ToastContainer />
    {loading ? (
        <ThreeDots color="#00BFFF" height={20} width={20} />
      ) : (
        <ul>
          {inventory.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inventory;
