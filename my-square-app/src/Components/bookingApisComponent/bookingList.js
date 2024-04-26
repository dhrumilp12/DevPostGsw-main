// BookingList component fetches and displays a list of bookings.
// Each booking is shown in a card format with details such as booking ID, status, and timestamps.
// It provides buttons to update or cancel each booking, utilizing sub-components for specific actions like `CancelBookingButton`.
// The component also handles loading and error states to provide appropriate feedback to the user.

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../Actions/bookingApisAction/bookingListAction';
import { CircularProgress, Box, Card, CardContent, Typography, List, ListItem, Divider, Grid , Button} from '@mui/material';
import { Link } from 'react-router-dom';
import CancelBookingButton from './bookingCancel';  
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';

const BookingList = () => {
    const dispatch = useDispatch();
    const { bookings, loading, error } = useSelector(state => state.bookingsList);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchBookings());
        };
        fetchData();
    }, [dispatch]);  // Ensure dependencies are correct to avoid unnecessary re-renders
    

    if (loading) {
        return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;
    }

    if (error) {
        return <Typography variant="h6" color="error" textAlign="center">Error: {error}</Typography>;
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
                <Typography variant="h4" gutterBottom align="center" mt={2}>Bookings List</Typography>
                <List>
                    {bookings.map(booking => (
                        <ListItem key={booking.id} alignItems="flex-start">
                            <Card sx={{ width: '100%' }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>Booking ID: {booking.id}</Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body1" gutterBottom><strong>Status:</strong> {booking.status}</Typography>
                                    <Typography variant="body1" gutterBottom><EventIcon sx={{ verticalAlign: 'middle' }} /> <strong>Created At:</strong> {new Date(booking.createdAt).toLocaleString()}</Typography>
                                    <Typography variant="body1" gutterBottom><AccessTimeIcon sx={{ verticalAlign: 'middle' }} /> <strong>Start At:</strong> {new Date(booking.startAt).toLocaleString()}</Typography>
                                    <Typography variant="body1" gutterBottom><LocationOnIcon sx={{ verticalAlign: 'middle' }} /> <strong>Location ID:</strong> {booking.locationId}</Typography>
                                    <Typography variant="body1" gutterBottom><PersonIcon sx={{ verticalAlign: 'middle' }} /> <strong>Customer ID:</strong> {booking.customerId}</Typography>
                                    <Typography variant="body1" sx={{ mt: 1 }}><strong>Appointment Segments:</strong></Typography>
                                    {booking.appointmentSegments.map((segment, index) => (
                                        <Box key={index} pl={2}>
                                            <Typography variant="body2">- Team Member ID: {segment.teamMemberId}</Typography>
                                            <Typography variant="body2">- Service Variation ID: {segment.serviceVariationId}</Typography>
                                            <Typography variant="body2">- Service Variation Version: {segment.serviceVariationVersion}</Typography>
                                            <Typography variant="body2">- Duration Minutes: {segment.durationMinutes}</Typography>
                                        </Box>
                                    ))}
                                   
                                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                    <Button component={Link} to={`/updateBooking/${booking.id}`} variant="contained" color="primary">
                                    Update
                                    </Button>
                                    <CancelBookingButton bookingId={booking.id} bookingVersion={booking.version} />
                                </Box>                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
};

export default BookingList;
