// const db = require('../db');
const axios = require('axios');
const squareClient = require('./squareClient');

const updateCatalogItemImage = async (itemId, imagePath) => {
    try {
        const imageData = {
          idempotency_key: `imageUpdate-${Date.now()}`, 
          object: {
            type: 'IMAGE',
            id: '#tempImageId', 
            image_data: {
              caption: 'Catalog Item Image',
              image: {
                url: '', 
                data: imageBase64, 
              }
            }
          }
        };
    
        // Link the image to the catalog item
        const catalogObjectData = {
          idempotency_key: `catalogUpdate-${Date.now()}`,
          object: {
            type: 'ITEM',
            id: itemId,
            image_ids: ['#tempImageId'] // Link to the temporary image ID
          }
        };
            
    const imageResponse = await axiosInstance.post('/upsert', imageData);
    console.log('Image upsert response:', imageResponse.data);

    
    const catalogResponse = await axiosInstance.post('/upsert', catalogObjectData);
    console.log('Catalog item upsert response:', catalogResponse.data);

    return catalogResponse.data;
  } catch (error) {
    console.error('Error updating catalog item image:', error);
    throw error;
  }
};

module.exports = {
  updateCatalogItemImage
};