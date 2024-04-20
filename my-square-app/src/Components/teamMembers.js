import React, { useState, useEffect } from 'react';

function TeamMembers() {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Use POST request to match the updated backend endpoint
        fetch('http://localhost:3000/api/teams/members/search', {
            method: 'POST',  // Change method to POST
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer EAAAll40XS3OFGqEFTGfKovs3albhQW59-U0yIuGM_kxI6qXHVPIZM5WHWyBBbkV',  // Make sure to handle your access token correctly
            },
            body: JSON.stringify({
                query: {
                    filter: {
                        status: "ACTIVE"
                    }
                },
                limit: 10  // You can adjust the limit as per your requirements
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.message);
            } else {
                setMembers(data);
            }
        })
        .catch(err => setError('Failed to fetch team members'));
    }, []); // This effect runs only once when the component mounts.

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Team Members</h1>
            <ul>
                {members.map(member => (
                    <li key={member.id}>NAME:{member.givenName} {member.familyName}, ID:{member.id}, STATUS:{member.status}</li>  // Handle cases where role might not be defined
                ))}
            </ul>
        </div>
    );
}

export default TeamMembers;
