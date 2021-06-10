import React, { useState, useEffect } from 'react';
import ReviewsList from './ReviewsList.js';
import exampleData from '../../store/exampleData.js';
import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';
import NewReview from './NewReview.js';
import SideBar from './SideBar.js';
// -----------material-ui stuff-----------
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
// =============== help with more reviews button, currently fetching all reviews, only want to render first two and two more after each button press

// in this component i want to fetch all the reviews and send the relevent information to the review list component

const RatingsAndReviews = () => {
  // these are the states for the url and review components
  const [reviewData, setReviewData] = useState([]);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/';
  const headers = { headers: { 'Authorization': `${GITHUB_API_KEY}` } };
  // state are needed for the sidebar component
  const [metaData, setMetaData] = useState({});

  // getting reviews for a product
  const getReviews = () => {
    axios.get(`${url}?count=1000&sort=${sort}&product_id=${exampleData.id}`, headers)
      .then((response) => {
        // console.log(response.data.results);
        let dataArr = response.data.results;
        setReviewData(dataArr);
      })
      .catch((err) => console.log('there has been an error fetching initial reviews'));
  };

  // a method for fetching metadata for products is needed to send to SideBar component
  const getMetaData = () => {
    axios.get(`${url}meta?product_id=${exampleData.id}`, headers)
      .then((response) => {
        // console.log('this is results from metadata fetch', response.data);
        setMetaData(response.data);
      })
      .catch(() => console.log('there has been an error fetching the metadata for the sidebar component'));
  };

  // onchange function for selecting sort method
  const sortMethodChange = (event) => {
    // console.log('this is the method we are chosing to sort by next........', event);
    setSort(event);
    setReviewData([]);
  };

  // this is similar to component did mount because this will run after the initial rendering of the page.
  // use effect will re-run whenever the state of sort changes having sort set as an empty string works because the get request for setReviews has a default sort of 'relevant'. so... onchange will triger a new fetch for data only AFTER sort is set to new value.
  useEffect(() => {
    getMetaData();
    getReviews();
  }, [sort]);

  const useStyles = makeStyles((theme) => ({
    progressBar: {
      flexGrow: 1,
      height: '15px'
    },
    main: {
      // position: 'fixed',
      left: '25%'
    },

    reviews: {
      backgroundColor: 'white',
    },
    other: {
      backgroundColor: 'white',
    }
  }));
  const classes = useStyles();
  // if the data doesnt exist yet render null
  return (
    <Grid className={classes.main} container direction="row" >
      <Grid container item ><h2>RATINGS & REVIEWS</h2></Grid>
      <Grid container item direction="column" md={4} className={classes.other}>
        {metaData.ratings ? <SideBar metaData={metaData} /> : null}
      </Grid>
      <Grid container item direction="column" className={classes.reviews} md={8}>
        <Grid container item direction="row" alignItems="center" spacing={1}>
          <Grid item><p>{reviewData.length} Reviews sorted by </p></Grid>
          <Grid item>
            <FormControl className="sortSelector">
              <Select
                labelId="sort-select-label"
                id="sort-selector"
                value={sort}
                onChange={(event) => { sortMethodChange(event.target.value); }}
              >
                <MenuItem value="relevant">Relevant</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="helpful">Helpful</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item direction="column">{reviewData[1] ? <ReviewsList url={url} reviewData={reviewData.slice(0, count)} /> : null}</Grid>
        {/* making MORE REVIEWS button dissapear when out of reviews */}
        <Grid item>{count < reviewData.length ? <button onClick={() => {
          setCount(count + 2);
        }}>MORE REVIEWS</button> : null}</Grid>
        <button onClick={() => {
          return <NewReview />;
        }}>ADD A REVIEW +</button>
      </Grid>
    </Grid>
  );
};

export default RatingsAndReviews;

