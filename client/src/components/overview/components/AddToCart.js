import React, {useState, useEffect, useRef} from 'react';
import { Select, MenuItem, Button, Box, Popover, Grid } from '@material-ui/core';
import { display } from '@material-ui/system';
import axios from '../../../redux-helpers/lib/axios-config.js';

const Sizes = React.forwardRef((props, ref) => {
  var options = Object.keys(props.options);
  if (options.length < 1) {
    return <Select value='0' disabled={true}>
      <MenuItem value='0'>OUT OF STOCK</MenuItem>
    </Select>;
  }
  return (
    <Select {...props} ref={ref}>
      <MenuItem value='0' disabled>Select Size</MenuItem>
      {options.map((x, idx) => (
        <MenuItem key={idx} value={x}>{x}</MenuItem>))}
    </Select>
  );
});

const Quantities = props => {
  var options = [];
  var max = Math.min(props.count, 15);
  for (var x = 1; x <= max; x++) {
    options.push(x);
  }
  return (
    <Select {...props}>
      <MenuItem value='-' disabled>-</MenuItem>
      {options.map(x => (<MenuItem key={x} value={x}>{x}</MenuItem>))}
    </Select>
  );
};

const AddToCart = ({stock}) => {
  const [step, setStep] = useState(0);
  const [isOpen, open] = useState(false);
  const [currentSize, setSize] = useState('0');
  const [quantity, setQuantity] = useState('-');
  const [anchor, setAnchor] = useState(null);
  const sizeRef = useRef();
  var sizes = {};
  // filter sizes with 0 quantity out and duplicate stocks for a size
  for (var x in stock) {
    let {size, quantity} = stock[x];
    if (quantity > 0) {
      if (sizes[size]) {
        sizes[size][0] += quantity;
      } else {
        sizes[size] = [quantity, x];
      }
    }
  }

  const handleSizeChange = (size) => {
    open(false);
    setSize(size);
    setQuantity('1');
    setStep(1);
  };

  const handleQuantityChange = (quantity) => {
    setQuantity(quantity);
    setStep(2);
  };

  const handleButtonClick = (e) => {
    if (step === 0) {
      setAnchor(sizeRef.current);
      open(true);

      return;
    }

    let count = quantity;
    let skuID = parseInt(sizes[currentSize][1]);
    let requests = [...Array(count)].map(x => (axios.post('cart', {'sku_id': skuID })));
    Promise.all(requests)
      .then(data => {
        if (!data.status) {
          console.log(data[0].status);
          return;
        }
        console.log(data.status);
        // add a "added to cart" popup, maybe
      })
      .catch((e) => {
        console.error('error adding to cart: ' + e.message);
      });
  };

  // resets dropdowns on style switch
  useEffect(() => {
    setStep(0);
    setSize('0');
    setQuantity('-');
  }, [stock]);

  return (
    <div id='AddToCart'>
      <Grid container>
        <Grid item>
          <Sizes
            ref={sizeRef}
            value={currentSize}
            options={sizes}
            open={isOpen}
            onOpen={() => open(true)}
            onClose={() => open(false)}
            onChange={(e) => (handleSizeChange(e.target.value))}/>
        </Grid>
        <Grid item>
          <Quantities value={quantity}
            disabled={step < 1}
            onChange={(e) => (handleQuantityChange(e.target.value))}
            count={sizes[currentSize] ? sizes[currentSize][0] : 0}/>
        </Grid>
        <Grid item>
          <Box visibility={Object.keys(sizes).length === 0 ? 'hidden' : 'visible' } >
            <Button onClick={handleButtonClick}>ADD TO CART</Button>
          </Box>
          <Popover
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={() => { setAnchor(null); }}>
            Please select a size.
          </Popover>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddToCart;
