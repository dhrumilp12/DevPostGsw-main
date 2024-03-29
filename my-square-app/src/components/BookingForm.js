// src/components/BookingForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateBooking = () => {
    const [bookingData, setBookingData] = useState({
        customerId: '',
        service: '', 
        appointmentTime: '', 
        // Add other relevant booking details here, e.g.,  
        // notes: '', 
        // location: '',
    });

    const handleChange = (event) => {
        setBookingData({
            ...bookingData,
            [event.target.name]: event.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/bookings/create-booking', bookingData);
            console.log(response.data); 
            // Success! Do something here:
            // 1. Clear the form: setBookingData({ /* reset to initial state */ });
            // 2. Display a "Booking Created!" message to the user
        } catch (error) {
            console.error("Error creating booking:", error);
            // Error Handling: Display a user-friendly error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="customerId">Customer ID:</label>
                <input type="text" id="customerId" name="customerId" value={bookingData.customerId} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="service">Service:</label>
                <input type="text" id="service" name="service" value={bookingData.service} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="appointmentTime">Appointment Time:</label>
                <input type="datetime-local" id="appointmentTime" name="appointmentTime" value={bookingData.appointmentTime} onChange={handleChange} />
            </div>
            {/* Add more input fields as needed */}
            <button type="submit">Create Booking</button>
        </form>
    );
};

export default CreateBooking; 
