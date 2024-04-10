import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCatalogImage, updateCatalogImage } from '../../Actions/catalogApisAction/catalogImageAction';

const CatalogImageForm = () => {
  const [imageData, setImageData] = useState(null);
  const [objectId, setObjectId] = useState('');
  const [imageId, setImageId] = useState('');
  const dispatch = useDispatch();

  const handleCreateImageSubmit = (e) => {
    e.preventDefault();
    if (imageData) {
      const idempotencyKey = Date.now().toString();
      dispatch(createCatalogImage(idempotencyKey, objectId, imageData));
    }
  };

  const handleUpdateImageSubmit = (e) => {
    e.preventDefault();
    if (imageData) {
      const idempotencyKey = Date.now().toString();
      dispatch(updateCatalogImage(imageId, idempotencyKey, imageData));
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateImageSubmit}>
        <label>Object ID:</label>
        <input type="text" value={objectId} onChange={(e) => setObjectId(e.target.value)} />
        <br />
        <label>Image:</label>
        <input type="file" onChange={(e) => setImageData(e.target.files[0])} />
        <br />
        <button type="submit">Create Image</button>
      </form>

      <form onSubmit={handleUpdateImageSubmit}>
        <label>Image ID:</label>
        <input type="text" value={imageId} onChange={(e) => setImageId(e.target.value)} />
        <br />
        <label>Image:</label>
        <input type="file" onChange={(e) => setImageData(e.target.files[0])} />
        <br />
        <button type="submit">Update Image</button>
      </form>
    </div>
  );
};

export default CatalogImageForm;
