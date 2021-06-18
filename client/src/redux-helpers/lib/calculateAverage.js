const calc = (ratings) => {
  var reviewCount = 0;
  var sum = 0;
  for (const [key, value] of Object.entries(ratings) ) {
    reviewCount += parseInt(value);
    sum += (key * value);
  }
  if (reviewCount > 0) {
    sum /= reviewCount;
    // round to nearest quarter
    sum = (Math.round(sum * 4) / 4);
  }
  return sum;

};
export default calc;