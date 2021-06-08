import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import RelatedProductCard from './RelatedProductCard.js';
import {getRelatedProducts} from '../../redux-helpers/related/reduxRelatedProducts.js';
import { useDispatch, useSelector } from 'react-redux';


var RelatedProducts = () => {
  const currentProductId = useSelector(state => state.currentProduct.id);
  const dispatch = useDispatch();

  useEffect(() => {
    //need to refactor once getRelatedProducts is fixed to return array of objects
    getRelatedProducts(currentProductId);
  }); //possibly optimize with second argument, passing array of what doesn't re-render if nothing's changed

  return (
    <div>
      <Typography variant='subtitle1' align='left'>Related Products</Typography>
      {/* // */}
      {/* need to display as carousel and pass down what is in store */}
      {/* // */}
      <RelatedProductCard />
    </div>
  );
};

export default RelatedProducts;