import React, { useState, useEffect } from 'react';

function LocationsComponent({ onChange, value }) {
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/location/locations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer EAAAll40XS3OFGqEFTGfKovs3albhQW59-U0yIuGM_kxI6qXHVPIZM5WHWyBBbkV',  // Make sure to handle your access token correctly
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
