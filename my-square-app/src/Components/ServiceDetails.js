import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceDetails, updateServiceDetails, deleteService } from './serviceAction';

const ServiceDetail = ({ serviceId }) => {
  const dispatch = useDispatch();
  const { serviceDetails, loading, error } = useSelector(state => state.service);

  const [editableServiceDetails, setEditableServiceDetails] = useState({});

  useEffect(() => {
    dispatch(fetchServiceDetails(serviceId));
  }, [dispatch, serviceId]);

  useEffect(() => {
    setEditableServiceDetails(serviceDetails);
  }, [serviceDetails]);

  const handleChange = (e) => {
    setEditableServiceDetails({ ...editableServiceDetails, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    dispatch(updateServiceDetails(serviceId, editableServiceDetails));
  };

  const handleDelete = () => {
    dispatch(deleteService(serviceId));
  };

  return (
    <div>
      <h1>Service Detail</h1>
      {loading && <p>Loading service details...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && serviceDetails && (
        <div>
          <input type="text" name="name" value={editableServiceDetails.name || ''} onChange={handleChange} />
          <input type="text" name="description" value={editableServiceDetails.description || ''} onChange={handleChange} />
          {/* Add more input fields as needed */}
          <button onClick={handleUpdate}>Update Service</button>
          <button onClick={handleDelete}>Delete Service</button>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
