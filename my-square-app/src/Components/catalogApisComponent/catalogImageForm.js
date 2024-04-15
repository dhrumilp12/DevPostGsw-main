
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCatalogImage,updateCatalogImage } from '../../Actions/catalogApisAction/catalogImageAction';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

const CatalogImageForm = () => {
    const [file, setFile] = useState(null);
    const [objectId, setObjectId] = useState('');
    const [imageId, setImageId] = useState(''); // Added state for imageId
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
    
    const handleUpdateImageSubmit = (e) => {
        e.preventDefault();
        if (!file || !imageId || !objectId) {
            console.error("File, image ID or object ID is missing.");
            return;
        }
        const idempotencyKey = Date.now().toString();
        const formData = new FormData();
        formData.append('objectId', objectId);
        formData.append('image', file);
        formData.append('idempotencyKey', idempotencyKey);
        // Ensure this is consistent with how you append data in the create action
        console.log('Submitting with formData:', Object.fromEntries(formData));
        // Log FormData entries
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        dispatch(updateCatalogImage(imageId,formData));
    };
    
    

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Paper elevation={3} style={{ padding: '20px', width: '80%', maxWidth: '500px' }}>
                <Typography variant="h6" gutterBottom>
                    Upload or Update Catalog Image
                </Typography>
                <form noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Object ID (optional)"
                        variant="outlined"
                        margin="normal"
                        value={objectId}
                        onChange={(e) => setObjectId(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Image ID for Update"
                        variant="outlined"
                        margin="normal"
                        value={imageId}
                        onChange={(e) => setImageId(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </Button>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button color="primary" variant="contained" onClick={handleCreateImageSubmit}>
                            Create Image
                        </Button>
                        <Button color="secondary" variant="contained" onClick={handleUpdateImageSubmit}>
                            Update Image
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default CatalogImageForm;