import React from 'react';

const AddToCart = ({stock}) => {

  return (
    <div id='AddToCart'>
      <p>{JSON.stringify(stock)}</p>
    </div>
  );
};

export default AddToCart;


