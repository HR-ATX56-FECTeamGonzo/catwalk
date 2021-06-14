import React from 'react';
import RatingsAndReviews from './ratings_reviews/RatingsAndReviews.js';
import Overview from './overview/Overview.js';
import RelatedProducts from './related/RelatedProducts.js';
import OutfitList from './related/OutfitList.js';

<<<<<<< HEAD
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
=======

var App = () => (
  <div>
    <Overview />
    <RelatedProducts />
    <OutfitList />
    <RatingsAndReviews />
  </div>
);

>>>>>>> 01553fefaad475860624411812357a9f2506c292
export default App;