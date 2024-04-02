
import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createBookingSuccess, createBookingFailure } from '../Actions/bookingAction';
import './BookingForm.css'; // Ensure you have this CSS file for styling

const BookingForm = ({ dispatch }) => {
    const [bookingState, setBookingState] = useState({
        name: '',
        email: '',
        service: '',
        appointmentTime: '',
        notes: '' // Optional field for special requests or notes
    });

    const handleChange = (event) => {
        setBookingState({
            ...bookingState,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Assuming your API expects the same structure as bookingState
            const response = await axios.post('http://localhost:3000/api/bookings/create-booking', bookingState);
            dispatch(createBookingSuccess(response.data));
            alert('Booking created successfully!');
        } catch (error) {
            console.error("Error creating booking:", error);
            dispatch(createBookingFailure(error));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="booking-form">
            <h2>Book an Appointment</h2>
            <div className="form-group">
                <label htmlFor="name">Customer Name:</label>
                <input type="text" id="name" name="name" value={bookingState.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={bookingState.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="service">Service:</label>
                <select id="service" name="service" value={bookingState.service} onChange={handleChange} required>
                    <option value="">Select a service</option>
                    <option value="service1">Service 1</option>
                    <option value="service2">Service 2</option>
                    {/* Add more services as options here */}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="appointmentTime">Appointment Time:</label>
                <input type="datetime-local" id="appointmentTime" name="appointmentTime" value={bookingState.appointmentTime} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="notes">Notes (Optional):</label>
                <textarea id="notes" name="notes" value={bookingState.notes} onChange={handleChange} />
            </div>
            <button type="submit" className="booking-submit">Create Booking</button>
        </form>
    );
};

const mapDispatchToProps = { createBookingSuccess, createBookingFailure };

export default connect(null, mapDispatchToProps)(BookingForm);
