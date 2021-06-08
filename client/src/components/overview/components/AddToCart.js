import React, {useState} from 'react';

const AddToCart = ({stock}) => {
  const [step, setStep] = useState(0);
  return (
    <div id='AddToCart'>
      <p>{JSON.stringify(stock)}</p>
      <select defaultValue=' '>
        <option value=' '>Select Size</option>
      </select>
    </div>
  );
};

export default AddToCart;


