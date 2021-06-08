import React, {useState, useEffect, useRef} from 'react';

const SizeOptions = ({options}) => {
  if (options.length === 0) {
    return (<option value=''>OUT OF STOCK</option>);
  }
  return (
    <React.Fragment>
      <option value='' disabled>Select Size</option>
      {options.map(x => (<option key={x} value={x}>{x}</option>))}
    </React.Fragment>
  );
};

const Quantities = ({count}) => {
  if (count === undefined) {
    return <option value='-' disabled>-</option>;
  }
  var options = [];
  var max = Math.min(count, 15);
  for (var x = 1; x <= max; x++) {
    options.push(x);
  }
  return (
    <React.Fragment>
      <option value='-' disabled>-</option>
      {options.map(x => (<option key={x} value={x}>{x}</option>))}
    </React.Fragment>
  );
};

const AddToCart = ({stock}) => {
  const [step, setStep] = useState(0);
  const [currentSize, setSize] = useState('');
  const [currentQuantity, setQuantity] = useState('-');
  var sizes = {};
  const sizeRef = useRef(null);
  // parse stock object in a way that will be easy to iterate over
  for (var x in stock) {
    let {size, quantity} = stock[x];
    if (quantity > 0) {
      if (sizes[size]) {
        sizes[size] += quantity;
      } else {
        sizes[size] = quantity;
      }
    }
  }
  const handleSizeChange = (size) => {
    setSize(size);
    setQuantity('1');
    setStep(1);
  };
  const handleQuantityChange = (quantity) => {
    setQuantity(quantity);
    setStep(2);
  };

  const handleButtonClick = (e) => {
    // if step = 0, open up size dropdown.
    console.log(sizeRef.current);
    sizeRef.current.focus();
  };
  // resets dropdowns on style switch
  useEffect(() => {
    setStep(0);
    setSize('');
    setQuantity('-');
  }, [stock]);

  return (
    <div id='AddToCart'>
      <p>{JSON.stringify(stock)}</p>
      <select name='size'
        ref={sizeRef}
        value={currentSize}
        disabled={ Object.keys(sizes).length === 0 ? true : false }
        onChange={(e) => (handleSizeChange(e.target.value))}>
        <SizeOptions options={Object.keys(sizes)}/>
      </select>
      <br/>
      <select name='quantity'
        value={currentQuantity}
        disabled={step < 1}
        onChange={(e) => (handleQuantityChange(e.target.value))}>
        <Quantities count={sizes[currentSize]}/>
      </select>
      <br/>
      <button
        style={Object.keys(sizes).length === 0 ? {display: 'none'} : {} }
        onClick={(e) => (handleButtonClick(e))}>
      Add to Cart</button>
    </div>
  );
};

export default AddToCart;


