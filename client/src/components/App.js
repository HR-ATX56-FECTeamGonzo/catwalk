import React from 'react';
import RatingsAndReviews from './ratings_reviews/RatingsAndReviews.js';
import Overview from './overview/Overview.js';
import RelatedProducts from './related/RelatedProducts.js';
import OutfitList from './related/OutfitList.js';
import Grid from '@material-ui/core/Grid';

var App = () => (
  <div>
    <Overview />
    <Grid
      container
      direction="column"
      justify="flex-end"
      alignItems="center"

    >
      <RelatedProducts />
      <OutfitList />
      <RatingsAndReviews />
    </Grid>
  </div >
);

export default App;