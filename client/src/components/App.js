import React from 'react';
import RatingsAndReviews from './ratings_reviews/RatingsAndReviews.js';
import Overview from './overview/Overview.js';
import RelatedProducts from './related/RelatedProducts.js';
import OutfitList from './related/OutfitList.js';
import Grid from '@material-ui/core/Grid';


var App = () => (
  <div>
    <Grid container item direction="row" style={{
      width: '100%',
      height: '105px',
      backgroundColor: '#fbf9f3',
    }}>
      <Grid item style={{
        // justify: 'center'
      }}>
        <img src="logo.png" alt="logo" style={{
          height: '100px'
        }} />
      </Grid>
    </Grid>
    <Overview />
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center">
      {/* <RelatedProducts /> */}
      <OutfitList />
      <RatingsAndReviews />
    </Grid>
  </div>
);

export default App;