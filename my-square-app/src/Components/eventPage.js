import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from './eventPageAction';

const EventPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div>
      <h1>Events</h1>
      {loading && <p>Loading events...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {!loading && !error && events.map(event => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
            {/* Add more event details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventPage;
