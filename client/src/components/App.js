import React from 'react';
import RatingsAndReviews from './ratings_reviews/RatingsAndReviews.js';
import Overview from './overview/Overview.js';
import RelatedProducts from './related/RelatedProducts.js';
import OutfitList from './related/OutfitList.js';

var App = () => {
  return (
    <div>
      <Overview />
      <RelatedProducts />
      <OutfitList />
      <div id='reviews'>
        <RatingsAndReviews />
      </div>
    </div>
  );
};
export default App;