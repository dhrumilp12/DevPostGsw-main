import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalogItem } from '../../Actions/catalogApisAction/catalogSearchItem';

const CatalogItem = ({ itemId }) => {
  const dispatch = useDispatch();
  const { item, loading, error } = useSelector((state) => state.catalogItem);

  useEffect(() => {
    dispatch(fetchCatalogItem(itemId));
  }, [dispatch, itemId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{item?.item_data?.name}</h2>
      <p>{item?.item_data?.description}</p>
      {/* Display more item details as needed */}
    </div>
  );
};

export default CatalogItem;
