import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Box, Typography, Alert } from '@mui/material';

const PaymentStatus = () => {
  const { loading, error, success } = useSelector(state => state.payment);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Processing payment...
        </Typography>
      </Box>
    );
  }
  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }
  if (success) {
    return <Alert severity="success">Payment successful!</Alert>;
  }

  return null; // No status to display
};

export default PaymentStatus;
