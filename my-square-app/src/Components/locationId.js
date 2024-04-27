// LocationsComponent fetches and displays a list of locations from a server endpoint.
// It manages local state for locations and errors, providing a selection interface for users.
// The component is designed to be reusable wherever a location selection is required.

import React, { useState, useEffect } from 'react';

function LocationsComponent({ onChange, value }) {
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/location/locations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PRODUCTION_ACCESS_TOKEN}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                setLocations(data);
            } else {
                setError('Failed to load locations');
            }
        })
        .catch(err => {
            console.error('Failed to fetch locations:', err);
            setError('Failed to fetch locations');
        });
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <select value={value} onChange={onChange} className="form-control">
                <option value="">Select Location</option>
                {locations.map(location => (
                    <option key={location.id} value={location.id}>{location.name}- {location.id}</option>
                ))}
            </select>
        </div>
    );
}

export default LocationsComponent;
