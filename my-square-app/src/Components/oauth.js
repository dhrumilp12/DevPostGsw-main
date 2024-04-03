// src/components/Auth.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser, logout, fetchData } from '../Actions/oauthAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';

const Auth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated,loading, error } = useSelector(state => state.auth);

  const handleLogin = () => {
    dispatch(authenticateUser());
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  if (error) toast.error(`Error: ${error}`);

  const handleFetchData = () => {
    dispatch(fetchData());
  };

  return (
    <div>
        <ToastContainer />
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleFetchData}>Fetch Data</button> {/* For testing */}
        </div>
      ) : (
        <button onClick={handleLogin}>Login
        {loading ? (
            <ThreeDots color="#00BFFF" height={20} width={20} />
          ) : (
            'Login'
          )}
        </button>
      )}
    </div>
  );
};

export default Auth;
