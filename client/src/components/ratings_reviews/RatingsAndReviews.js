import React, {component, useState, useEffect} from 'react';
import ReviewsList from './ReviewsList.js';
import exampleData from '../../store/exampleData.js';
import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';
// import NewReview from './NewReview.js';
import SideBar from './SideBar.js';

// in this component i want to fetch all the reviews and send the relevent information to the review list component

const RatingsAndReviews = () => {
  // these are the states for the url and review components
  const [reviewData, setReviewData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/';
  // states are needed for the sidebar component
  const [metaData, setMetaData] = useState({});

  // getting reviews for a product
  const getReviews = () => {
    axios.get(`${url}?page=${pageNumber}&count=${count}&sort=${sort}&product_id=${exampleData.id}`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}`}})
      .then((response) => {
        // console.log(response.data.results);
        const dataArr = response.data.results;
        setReviewData(...reviewData, dataArr);
      })
      .catch((err) => console.log('there has been an error fetching initial reviews'));
  };

  // a method for fetching metadata for products is needed to send to SideBar component
  const getMetaData = () => {
    axios.get(`${url}meta?product_id=${exampleData.id}`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}`}})
      .then((response) => {
        // console.log('this is results from metadata fetch', response.data);
        setMetaData(response.data);
      })
      .catch(() => console.log('there has been an error fetching the metadata for the sidebar component'));
  };

  // this is similar to component did mount because this will run after the initial rendering of the page.
  useEffect(() => {
    getMetaData();
    getReviews();
  }, []);
  // if the data doesnt exist yet render null
  return (
    <div>
      <div>{metaData.ratings ? <SideBar metaData={metaData} /> : null}</div>
      <div><ReviewsList reviewData={reviewData} sort={sort} count={count}/></div>
      <button onClick={() => {
        setPageNumber(pageNumber + 1);
        getReviews();
      }}>MORE REVIEWS</button>

      <button onClick={() => {
        // return <NewReview />;
      }}>ADD A REVIEW +</button>
    </div>
  );
};

export default RatingsAndReviews;