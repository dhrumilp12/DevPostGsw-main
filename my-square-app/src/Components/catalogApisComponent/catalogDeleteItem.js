import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteCatalogItem } from '../../Actions/catalogApisAction/catalogDeleteItem';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      dispatch(deleteCatalogItem(itemId));
      navigate('/'); // Navigate to the home page after deletion
    }
  };

  return (
    <Tooltip title="Permanently delete this item" placement="top" arrow>
      <StyledButton
        variant="contained"
        color="error"
        startIcon={<DeleteForeverIcon />}
        onClick={handleDelete}
      >
        Delete Item
      </StyledButton>
    </Tooltip>
  );
};

export default DeleteCatalogItem;