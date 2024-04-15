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
  Divider
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1000px',
  margin: 'auto',
  marginTop: theme.spacing(5),
  background: 'linear-gradient(145deg, #0A192F, #172A45)',
  borderRadius: theme.spacing(2),
  animation: `${fadeIn} 1s ease-out`
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  boxShadow: `0 12px 24px -4px ${theme.palette.primary.dark}`,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  background: 'linear-gradient(145deg, #233B58, #152A48)',
  color: theme.palette.grey[100],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)'
  }
}));

const CatalogSearchItem = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const { item, loading, error } = useSelector(state => state.catalogSearchItem);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchCatalogItem(itemId));
  }, [dispatch, itemId]);

  if (loading) return <CircularProgress color="secondary" />;
  if (error) return <Typography color="error">{error}</Typography>;

  const formatPrice = (priceMoney) => {
    if (!priceMoney || !priceMoney.amount) return 'N/A';
    return `$${(priceMoney.amount / 100).toFixed(2)} ${priceMoney.currency}`;
  };

  const getItemDetails = (item) => {
    if (item.type === 'ITEM_VARIATION') {
      return {
        name: item.itemVariationData.name,
        description: item.itemVariationData.description || "No description provided",
        imageUrl: item.imageUrl,
        price: formatPrice(item.itemVariationData.priceMoney),
        additionalInfo: `Stockable: ${item.itemVariationData.stockable}, Sellable: ${item.itemVariationData.sellable}`
      };
    } else {
      return {
        name: item.itemData.name,
        description: item.itemData.description || item.itemData.descriptionPlaintext || "No description provided",
        imageUrl: item.imageUrl,
        price: formatPrice(item.itemData.priceMoney),
        additionalInfo: `Archived: ${item.itemData.isArchived}, Product Type: ${item.itemData.productType}`
      };
    }
  };

  const details = item ? getItemDetails(item) : null;

  return (
    <StyledBox>
      {details ? (
        <StyledCard>
          <CardMedia
            component="img"
            height="340"
            image={details.imageUrl || "https://via.placeholder.com/800x340"}
            alt={details.name || 'No image available'}
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {details.name}
            </Typography>
            <Divider sx={{ my: 1, bgcolor: theme.palette.primary.light }} />
            <Typography variant="body1" color="text.secondary">
              {details.description}
            </Typography>
            <Typography variant="h5" color="secondary" gutterBottom>
              Price: {details.price}
            </Typography>
            <Chip label={details.additionalInfo} color="primary" variant="outlined" sx={{ mt: 2 }} />
          </CardContent>
        </StyledCard>
      ) : (
        <Typography variant="h4" color="text.secondary" textAlign="center">No item found</Typography>
      )}
    </StyledBox>
  );
};

export default CatalogSearchItem;