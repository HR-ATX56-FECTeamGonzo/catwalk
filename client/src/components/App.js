import React from 'react';
import RatingsAndReviews from './ratings_reviews/RatingsAndReviews.js';
import Overview from './overview/Overview.js';
import RelatedProducts from './related/RelatedProducts.js';
import OutfitList from './related/OutfitList.js';

var App = () => (
  <div>
    <Overview />
    <RatingsAndReviews />
    <RelatedProducts />
    <OutfitList />
  </div>
);

export default App;