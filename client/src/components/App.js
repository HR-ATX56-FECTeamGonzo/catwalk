import React from 'react';
import RatingsAndReviews from './ratings_reviews/RatingsAndReviews.js';
import Overview from './overview/Overview.js';
import RelatedProducts from './related/RelatedProducts.js';
import OutfitList from './related/OutfitList.js';

var App = () => (
  <div>
    <Overview />
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      // leftMargin: '100px'
      // justifyContent: 'flex-start'
    }}>

      <RelatedProducts />
      <OutfitList />
      <RatingsAndReviews />
    </div>
  </div>
);

export default App;