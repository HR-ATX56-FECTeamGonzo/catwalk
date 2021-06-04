import React from 'react';
import ReviewsList from './ratings_reviews/ReviewsList.jsx';
import ProductInfo from './overview/ProductInfo.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>react app
        <ReviewsList />
      </div>
    );
  }
}

export default App;