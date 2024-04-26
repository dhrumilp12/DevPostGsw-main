// PaymentDetails fetches and displays detailed information about a specific payment transaction.
// It includes details like amount, currency, status, card details, and provides a link to the payment receipt.

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentDetails } from '../../Actions/paymentApisAction/paymentAction';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Chip,
} from '@mui/material';
import moment from 'moment';

const PaymentDetails = () => {
  const { paymentId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.paymentDetails);

  useEffect(() => {
    if (paymentId) {
      dispatch(fetchPaymentDetails(paymentId));
    }
  }, [dispatch, paymentId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        Error: {error}
      </Typography>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom textAlign="center">
          Payment Details
        </Typography>
        {data && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1"><strong>Amount:</strong> ${data.amountMoney.amount / 100}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1"><strong>Currency:</strong> {data.amountMoney.currency}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1"><strong>Status:</strong> <Chip label={data.status} color="primary" /></Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1"><strong>Transaction Date:</strong> {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Card Number:</strong> **** **** **** {data.cardDetails.card.last4}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Entry Method:</strong> {data.cardDetails.entryMethod}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Receipt URL:</strong> <a href={data.receiptUrl} target="_blank" rel="noopener noreferrer">View Receipt</a>
              </Typography>
            </Grid>
            {/* Add more payment details here */}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentDetails;
