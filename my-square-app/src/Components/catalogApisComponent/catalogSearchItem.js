import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCatalogItem } from '../../Actions/catalogApisAction/catalogSearchItem';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Box, Chip, Divider, Grid, useMediaQuery, createTheme, ThemeProvider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#17a2b8', // This is your navbar's primary color
    },
    secondary: {
      main: '#1a2035', // Dark background color from your navbar
    },
    background: {
      default: '#1a2035',
      paper: '#2c303b',
    },
    text: {
      primary: '#b0b8c5',
      secondary: '#d1d9e6',
    },
    error: {
      main: '#ff0000', // Adjust error color as needed
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px', // Rounded buttons like your navbar
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        "root": {
          "color": "white",
          "background": "#1a2035",
          "borderRadius": "20px",
          "border": "2px solid #2c303b",
          "&.Mui-focused": { // Correct usage
            "border": "2px solid #17a2b8"
          }
        }
      }
    }      
  },
  typography: {
    fontFamily: [
      'Segoe UI',
      'Tahoma',
      'Geneva',
      'Verdana',
      'sans-serif'
    ].join(','),
  }
});

const CatalogSearchItem = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const { item, loading, error } = useSelector(state => state.catalogSearchItem);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <ThemeProvider theme={darkTheme}>
      <Box p={isMobile ? 2 : 5}>
        {details ? (
          <Card raised elevation={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={details.imageUrl || "https://via.placeholder.com/800x340"}
                  alt={details.name || 'No image available'}
                  sx={{ width: '100%', height: 340, objectFit: 'cover' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {details.name}
                  </Typography>
                  <Divider sx={{ my: 1, bgcolor: theme.palette.primary.light }} />
                  <Typography variant="body1" color="text.secondary">
                    {details.description}
                  </Typography>
                  <Typography variant="h6" color="secondary" gutterBottom>
                    Price: {details.price}
                  </Typography>
                  <Chip label={details.additionalInfo} color="primary" variant="outlined" sx={{ mt: 2 }} />
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Typography variant="h4" color="text.secondary" textAlign="center">No item found</Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CatalogSearchItem;
