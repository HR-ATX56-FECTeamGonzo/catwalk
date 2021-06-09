import React from 'react';
// possibly can grab the average star rating from the store

// this component needs to render:
//  - the Average star rating for a clicked item
//  - the percent of reviewers that recommend this product
//  - the breakdown of star ratings 1 -5 star ratings
//  - how the product fits on a scale from too small to too large
//  - how comfortable the product is from poor to perfect
const SideBar = (props) => {
  // console.log('this is props from sidebar:', props.metaData);
  // need to find the average star rating
  const starRating = props.metaData.ratings;
  const oneStar = Number(starRating[1] || 0);
  const twoStar = Number(starRating[2] || 0);
  const threeStar = Number(starRating[3] || 0);
  const fourStar = Number(starRating[4] || 0);
  const fiveStar = Number(starRating[5] || 0);
  const averageStarRating = (((oneStar) + (twoStar * 2) + (threeStar * 3) + (fourStar * 4) + (fiveStar * 5)) / (oneStar + twoStar + threeStar + fourStar + fiveStar));
  // i need to find the metrics for the fit, comfort etc.
  const characteristics = props.metaData.characteristics;
  // now i need to calculate the percent of reviews that recommend this product
  const recommended = props.metaData.recommended;
  const t = Number(recommended.true);
  const f = Number(recommended.false);
  const percentRecommended = Math.floor((t / (t + f)) * 100);
  // console.log('percent of people recommended', Math.floor(percentRecommended * 100));


  return (
    <div>
      ---------------------------
      <div>star rating: {averageStarRating.toFixed(1)}</div>
      <div>{percentRecommended}% of reviews recommend this product</div>
      <div>5 STARS - {fiveStar}</div>
      <div>4 STARS - {fourStar}</div>
      <div>3 STARS - {threeStar}</div>
      <div>2 STARS - {twoStar}</div>
      <div>1 STARS - {oneStar}</div>
      <div>SIZE {characteristics.Fit.value}</div>
      <div>COMFORT {characteristics.Comfort.value}</div>
      <div>QUALITY {characteristics.Quality.value}</div>
      {/* conditionally render the length if it has a length  */}
      <div>LENGTH {characteristics.Length.value}</div>
      -----------------------------
    </div>
  );
};
export default SideBar;