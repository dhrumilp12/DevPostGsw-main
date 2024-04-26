// CatalogSearchItem fetches and displays detailed information about a specific catalog item identified by item ID from URL parameters.
// It provides functionalities like booking and inventory adjustments through subcomponents like BookingForm and BatchAdjustInventoryForm.
// Utilizes a dark theme consistent with the application's design and handles loading and error states effectively.

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate  } from 'react-router-dom';
import { fetchCatalogItem } from '../../Actions/catalogApisAction/catalogSearchItem';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Box, Chip, Divider, Grid, useMediaQuery, createTheme, ThemeProvider, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BookingForm from '../bookingApisComponent/bookingForm'
import BatchAdjustInventoryForm from '../inventoryApiComponent/inventoryBatchAdjust';

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
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [showAdjustmentForm, setShowAdjustmentForm] = useState(false);
  const [adjustmentDetails, setAdjustmentDetails] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchCatalogItem(itemId));
  }, [dispatch, itemId]);

  if (loading) return <CircularProgress color="secondary" />;
  if (error) return <Typography color="error">{error}</Typography>;

  const formatPrice = (priceMoney) => {
    if (!priceMoney || !priceMoney.amount) return 'N/A';
    return `$${(priceMoney.amount / 100).toFixed(2)} ${priceMoney.currency}`;
  };
  const formatServiceDuration = (milliseconds) => `${milliseconds / 60000} minutes`;
  const getItemDetails = (item) => {
    let additionalInfo = []; // Initialize as an empty array to avoid undefined errors.
  
    if (item && item.itemVariationData) {
      additionalInfo = [
        `Stockable: ${item.itemVariationData.stockable ? 'Yes' : 'No'}`,
        `Sellable: ${item.itemVariationData.sellable ? 'Yes' : 'No'}`,
        `Available for Booking: ${item.itemVariationData.availableForBooking ? 'Yes' : 'No'}`,
        `Present at All Locations: ${item.itemVariationData.presentAtAllLocations ? 'Yes' : 'No'}`,
        `Service Duration: ${item.itemVariationData.serviceDuration ? formatServiceDuration(item.itemVariationData.serviceDuration) : 'N/A'}`,
        `Team Member IDs: ${item.itemVariationData.teamMemberIds ? item.itemVariationData.teamMemberIds.join(', ') : 'None'}`
      ];
      return {
        name: item.itemVariationData.name,
        pricingType: item.itemVariationData.pricingType,
        description: item.itemVariationData.description || "No description provided",
        imageUrl: item.imageUrl || "https://via.placeholder.com/800x340",
        price: formatPrice(item.itemVariationData.priceMoney),
        additionalInfo: additionalInfo,
        updatedAt: new Date(item.updatedAt).toLocaleString(),
        version: item.version
      };
    } else if (item && item.itemData) {
      additionalInfo.push(`Archived: ${item.itemData.isArchived}, Product Type: ${item.itemData.productType}`);
      return {
        name: item.itemData.name,
        description: item.itemData.description || item.itemData.descriptionPlaintext || "No description provided",
        imageUrl: item.imageUrl,
        price: formatPrice(item.itemData.priceMoney),
        additionalInfo: additionalInfo
      };
    }
  
    return null; // Return null if no item data is available.
  };
  

  const details = item ? getItemDetails(item) : null;
  const handleToggleBookingForm = () => {
    setShowBookingForm(!showBookingForm);
    if (!showBookingForm) { // Only when opening the form
      setBookingDetails({
        startAt: new Date().toISOString(), // Set to current time or a specific time
        locationId: '', // Example field
        customerId: '', // Preset or leave empty for user to fill
        appointmentSegments: [{
          teamMemberId: item.itemVariationData.teamMemberIds[0], // Example field
          serviceVariationId: item.id, // Example field
          serviceVariationVersion: item.version, // Example field
          durationMinutes: 60 // Default duration or based on item details
        }],
      });
    }
    else {
      // Handle case where data might be missing
      console.error("Missing data for booking form initialization");
  }
  };
  // Function to handle booking confirmation
  const onBookingConfirmed = () => {
    console.log("Attempting to navigate to payment form...");
    if (item && item.itemVariationData && item.itemVariationData.priceMoney) {
        console.log("Navigating to payment form with price:", item.itemVariationData.priceMoney);
        navigate('/payment', { state: { amountMoney: item.itemVariationData.priceMoney } });
    } else {
        console.error('Price details are missing.');
    }
};

  const handleToggleAdjustmentForm = () => {
    setShowAdjustmentForm(!showAdjustmentForm);
    if (!showAdjustmentForm) { // Only set details when opening the form
      setAdjustmentDetails({
        initialItemId: item.id, // Assuming 'item.id' is your ITEM_VARIATION ID
        initialQuantity: 0 // Default or fetched quantity
      });
    }
  };
  
  
  return (
    <ThemeProvider theme={darkTheme}>
      <Box p={isMobile ? 2 : 5} sx={{mb:4}}>
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
                  {Array.isArray(details.additionalInfo) ? details.additionalInfo.map((info, index) => (
                    <Chip key={index} label={info} color="primary" variant="outlined" sx={{ mt: 1, mr: 1 }} />
                  )) : <Typography color="error">Error: Additional Info is not available.</Typography>}

                  <Button variant="contained" color="primary" onClick={handleToggleBookingForm} sx={{ mt: 2 }}>
                  Book Now
                </Button>
               
                <Button variant="contained" color="primary" onClick={handleToggleAdjustmentForm} sx={{ mt: 2 }}>
                  Adjust Inventory
                </Button>
                </CardContent>
              </Grid>
              <Grid item xs={12} md={6}>
              {/* Booking Form */}
              {showBookingForm && <BookingForm initialBookingDetails={bookingDetails} onBookingConfirmed={onBookingConfirmed} />}
          </Grid>
          {showAdjustmentForm && (
                <Grid item xs={12}>
                  <BatchAdjustInventoryForm initialItemId={adjustmentDetails.initialItemId} initialQuantity={adjustmentDetails.initialQuantity}  />
                </Grid>
              )}
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