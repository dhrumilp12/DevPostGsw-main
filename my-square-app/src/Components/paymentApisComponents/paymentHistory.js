import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentsHistory } from '../../Actions/paymentApisAction/paymentAction';
import {
  CircularProgress,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
  
} from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import ReceiptIcon from '@mui/icons-material/Receipt';

const PaymentHistory = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { payments, loading, error } = useSelector((state) => state.paymentHistory);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPaymentsHistory());
  }, [dispatch]);

  const handleRowClick = (paymentId) => {
    navigate(`/payment-detail/${paymentId}`);
  };


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
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Payment History
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="payment history table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              {!isMobile && <TableCell>Amount</TableCell>}
              {!isMobile && <TableCell>Currency</TableCell>}
              <TableCell>Status</TableCell>
              <TableCell align="right">Receipt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow
                key={payment.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: theme.palette.action.hover } }}
                onClick={() => handleRowClick(payment.id)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">
                  {moment(payment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </TableCell>
                {!isMobile && <TableCell>${(payment.amountMoney.amount / 100).toFixed(2)}</TableCell>}
                {!isMobile && <TableCell>{payment.amountMoney.currency}</TableCell>}
                <TableCell>
                  <Chip
                    label={payment.status}
                    color={payment.status === 'COMPLETED' ? 'success' : 'warning'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <ReceiptIcon color="primary" />
                    {!isMobile && ' View Receipt'}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PaymentHistory;
