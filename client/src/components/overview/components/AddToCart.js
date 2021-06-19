import React, {useState, useEffect, useRef} from 'react';
import { Select, MenuItem, Button, Box, Popover, Grid, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import axios from '../../../redux-helpers/lib/axios-config.js';

const StyledInput = withStyles({
  root: {
    cursor: 'text',
    width: '80%',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  input: {
    width: '100%',
    borderRadius: 4,
    border: '2px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px'
  }
})(InputBase);

const StyledButton = withStyles({
  root: {
    fontSize: '0.9375rem',
    padding: '7px 5px',
    width: '97%',
    margin: '10px 0px'
  },
  label: {
    width: '85%',
    textAlign: 'center'
  }
})(Button);
const Sizes = React.forwardRef((props, ref) => {
  var options = Object.keys(props.options);
  if (options.length < 1) {
    return (
      <Select value='0' disabled={true} input={<StyledInput/>}>
        <MenuItem value='0'>OUT OF STOCK</MenuItem>
      </Select>
    );
  }
  return (
    <Select {...props} ref={ref} input={<StyledInput/>}>
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
    <Select {...props} input={<StyledInput/>}>
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
    <div id='AddToCart' style={{padding: '20px 0px'}}>
      <Grid container>
        <Grid item xs={8}>
          <Sizes
            ref={sizeRef}
            value={currentSize}
            options={sizes}
            open={isOpen}
            onOpen={() => open(true)}
            onClose={() => open(false)}
            onChange={(e) => (handleSizeChange(e.target.value))}/>
        </Grid>
        <Grid item xs={3}>
          <Quantities value={quantity}
            disabled={step < 1}
            onChange={(e) => (handleQuantityChange(e.target.value))}
            count={sizes[currentSize] ? sizes[currentSize][0] : 0}/>
        </Grid>
        <Grid item xs={12}>
          <Box visibility={Object.keys(sizes).length === 0 ? 'hidden' : 'visible' } >
            <StyledButton size='large' onClick={handleButtonClick} variant='outlined'>ADD TO CART</StyledButton>
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
