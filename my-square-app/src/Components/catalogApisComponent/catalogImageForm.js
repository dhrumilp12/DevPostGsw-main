import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCatalogImage } from '../../Actions/catalogApisAction/catalogImageAction';

const CatalogImageForm = () => {
    const [file, setFile] = useState(null);
    const [objectId, setObjectId] = useState('');
    const dispatch = useDispatch();

    const handleCreateImageSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            console.error("No file selected.");
            return;
        }
        const idempotencyKey = Date.now().toString();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('idempotencyKey', idempotencyKey);
    
        // Construct the URL with objectId as a query parameter
        const url = `/api/catalogs/images${objectId ? `?objectId=${objectId}` : ''}`;
        
        console.log('Submitting image with Object ID:', objectId || "No Object ID provided");
        
        dispatch(createCatalogImage(url, formData));
    };
    

    return (
        <div>
             <form onSubmit={handleCreateImageSubmit} encType="multipart/form-data">
                <label>Object ID (optional):</label>
                <input type="text" value={objectId} onChange={(e) => setObjectId(e.target.value)} />
                <br />
                <label>Image:</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <br />
                <button type="submit">Create Image</button>
            </form>
        </div>
    );
};

export default CatalogImageForm;
