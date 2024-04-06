import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCatalogItem } from '../../Actions/catalogApisAction/catalogDeleteItem';
import { Button } from 'react-bootstrap';

const DeleteCatalogItem = ({ itemId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.catalogDelete);

  const handleDelete = () => {
    dispatch(deleteCatalogItem(itemId));
  };

  return (
    <div>
      <Button variant="danger" onClick={handleDelete} disabled={loading}>
        Delete Item
      </Button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default DeleteCatalogItem;
