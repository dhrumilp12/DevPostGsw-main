import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCatalogItem } from '../../Actions/catalogApisAction/catalogSearchItem';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const CatalogSearchItem = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const { item, loading, error } = useSelector((state) => state.catalogSearchItem);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchCatalogItem(itemId));
    }
  }, [dispatch, itemId]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" textAlign="center">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      {item ? (
        <Card sx={{ maxWidth: 600, mx: 'auto', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="300"
            image={item.itemData.imageUrl || "https://via.placeholder.com/600x300"}
            alt={item.itemData.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {item.itemData.name}
            </Typography>
            <Typography variant="body1" color="text.primary" mb={2}>
              {item.itemData.description}
            </Typography>
            
            {/* Display price and other important details */}
            <Typography variant="h6" color="secondary" gutterBottom>
              Price: ${item.itemData.price} {/* Assuming price is directly on itemData */}
            </Typography>
            {/* Example of rendering details with list */}
            <List dense>
              {item.itemData.details && item.itemData.details.map((detail, index) => (
                <ListItem key={index} disableGutters>
                  <ListItemText
                    primary={detail.title + ": " + detail.value}
                  />
                </ListItem>
              ))}
            </List>

            <Stack direction="row" spacing={1} mb={2}>
              <Chip label={`SKU: ${item.itemData.sku}`} variant="outlined" />
              {/* More chips for other attributes like size, color etc. */}
            </Stack>

            {/* Display variations if they exist */}
            {item.itemData.variations && (
              <Box>
                <Typography variant="h6">Available Variations:</Typography>
                {item.itemData.variations.map(variation => (
                  <Typography key={variation.id} variant="body2" gutterBottom>
                    {variation.name}: ${variation.price}
                  </Typography>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      ) : (
        <Typography textAlign="center">No item found</Typography>
      )}
    </Box>
  );
};

export default CatalogSearchItem;