// DeleteCatalogItem allows the user to delete a catalog item using its item ID obtained from URL parameters.
// It dispatches the `deleteCatalogItem` action upon user confirmation and navigates the user to the home page post-deletion.
// Includes styled components for a responsive button and tooltips for better user interaction.

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteCatalogItem } from '../../Actions/catalogApisAction/catalogDeleteItem';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  margin: '20px',
  padding: '10px 20px',
  fontSize: '1rem',
  '@media (max-width:600px)': {
    width: '100%',
    margin: '10px 0',
  },
});

const DeleteCatalogItem = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.Deleting this item will remove it from your catalog, affecting inventory and order processing.')) {
      dispatch(deleteCatalogItem(itemId));
      navigate('/'); // Navigate to the home page after deletion
    }
  };

  return (
    <div>
    <Tooltip title="Permanently delete this item. Deleting an item will remove it from all associated lists and could affect order processing if the item is in use." placement="top" arrow>
      <StyledButton
        variant="contained"
        color="error"
        startIcon={<DeleteForeverIcon />}
        onClick={handleClickOpen}
      >
        Delete Item
      </StyledButton>
    </Tooltip>
  <Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to delete this item? This action cannot be undone. Deleting this item will remove it from your catalog, affecting inventory and order processing.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button onClick={handleDelete} color="secondary" autoFocus>
      Confirm Delete
    </Button>
  </DialogActions>
</Dialog>
</div>
);
};

export default DeleteCatalogItem;