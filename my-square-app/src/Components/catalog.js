// src/components/Catalog.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCatalog } from '../Actions/catalogAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner'; 

const Catalog = () => {
  const dispatch = useDispatch();
  const { catalog, loading, error } = useSelector(state => state.catalog);

  
  
    useEffect(() => {
      dispatch(fetchCatalog());
    }, [dispatch]);
  
    if (error) {
      toast.error(`Error: ${error}`);
    }
  
    return (
      <div>
        <ToastContainer />
        <h2>Catalog</h2>
        {loading ? (
        <ThreeDots color="#00BFFF" height={20} width={20} />
      ) : (
        <ul>
          {catalog.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default Catalog;
