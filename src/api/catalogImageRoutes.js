const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const catalogImageService = require('../services/catalogImageService');
const { put } = require('./catalogRoutes');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
    });

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const image = req.file;
        const itemId = req.query.itemId;
        const updatedItem = await catalogImageService.updateCatalogImage(itemId, image);
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update catalog image' });
    }
});

router,put('/update-catalog/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;
        const imagePath = req.file.path; 
        const result = await catalogImageService.updateCatalogItemImage(itemId, imagePath);
        res.status(200).json({ message: 'Image updated successfully', data: result });
      } catch (error) {
        res.status(500).json({ error: 'Failed to update image' });
      }
    });

module.exports = router;