import React from 'react';
import ReviewsList from './ratings_reviews/ReviewsList.js';
import ProductInfo from './overview/ProductInfo.js';
import RelatedProducts from './related/RelatedProducts.js';
import OutfitList from './related/OutfitList.js';

var App = () => (
  <div>react app
    <ProductInfo />
    <ReviewsList />
    <RelatedProducts />
    <OutfitList />
  </div>
)


export default App;