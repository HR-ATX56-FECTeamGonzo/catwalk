import React, {component, useState, useEffect} from 'react';
import ReviewsList from './ReviewsList.js';
import exampleData from '../../store/exampleData.js';
import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';
import NewReview from './NewReview.js';
import SideBar from './SideBar.js';

// =============== help with more reviews button, currently fetching all reviews, only want to render first two and two more after each button press

// in this component i want to fetch all the reviews and send the relevent information to the review list component

const RatingsAndReviews = () => {
  // these are the states for the url and review components
  const [reviewData, setReviewData] = useState([]);
  const [reviewDataForList, setReviewDataForList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState('relevant');
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/';
  // states are needed for the sidebar component
  const [metaData, setMetaData] = useState({});

  // getting reviews for a product
  const getReviews = () => {
    axios.get(`${url}?page=${pageNumber}&count=1000&sort=${sort}&product_id=${exampleData.id}`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}`}})
      .then((response) => {
        // console.log(response.data.results);
        const dataArr = response.data.results;
        setReviewData(dataArr);
        // setting initial data for rendering first two reviewItems
        setReviewDataForList(reviewDataForList.concat(dataArr[0], dataArr[1]));
      })
      .catch((err) => console.log('there has been an error fetching initial reviews'));
  };

  // a method for fetching metadata for products is needed to send to SideBar component
  const getMetaData = () => {
    axios.get(`${url}meta?product_id=${exampleData.id}`, { 'headers': { 'Authorization': `${GITHUB_API_KEY}`}})
      .then((response) => {
        // console.log('this is results from metadata fetch', response.data);
        setMetaData(response.data);
        getReviews();
      })
      .catch(() => console.log('there has been an error fetching the metadata for the sidebar component'));
  };

  // onchange function for selecting sort method
  const sortMethodOnChange = (event) => {
    // console.log('this is the method we are chosing to sort by next........', event);
    setSort(event);
    getReviews();
  };
  // this is similar to component did mount because this will run after the initial rendering of the page.
  useEffect(() => {
    getMetaData();
    getReviews();
  }, []);
  // if the data doesnt exist yet render null
  return (
    <div>
      <div>{ metaData.ratings ? <SideBar metaData={metaData} /> : null }</div>
      <div>Review count: {reviewData.length}</div>
      <div>Sorted by:
        <select onChange={() => {
          sortMethodOnChange(event.target.value);
        }}>
          <option default value="relevant">relevant</option>
          <option value="newest">newest</option>
          <option value="helpful">helpful</option>
        </select>
      </div>
      <div>{ reviewData[0] ? <ReviewsList reviewDataforList={reviewDataForList}/> : null}</div>
      {/* making MORE REVIEWS button dissapear when out of reviews */}
      <div>{ count < reviewData.length ? <button onClick={() => {
        // adding two additional items to the reviewDataforList prop everytime the button is clicked
        setReviewDataForList(reviewDataForList.concat(reviewData[count], reviewData[count + 1]));
        setCount(count + 2);
      }}>MORE REVIEWS</button> : null }</div>
      <button onClick={() => {
        return <NewReview />;
      }}>ADD A REVIEW +</button>
    </div>
  );
};

export default RatingsAndReviews;