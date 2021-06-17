import axios from 'axios';
import GITHUB_API_KEY from '../../config/config.js';
import { useDispatch, useSelector } from 'react-redux';

const funcs = {
  updateCurrentProductId: (id) => ({
    type: 'UPDATE_CURRENT_PRODUCT_ID',
    payload: id,
  }),

  updateCurrentProductStyleIndex: (index) => ({
    type: 'UPDATE_CURRENT_PRODUCT_STYLE_INDEX',
    payload: index,
  }),

  updateCurrentProductStars: (number) => ({
    type: 'UPDATE_CURRENT_PRODUCT_STARS',
    payload: number,
  }),

  currentProductIdReducer: (previousState = 0, action) => {
    switch (action.type) {
      case 'UPDATE_CURRENT_PRODUCT_ID':
        return action.payload;
      default:
        return previousState;
    }
  },

  currentProductStyleIndexReducer: (previousState = 0, action) => {
    switch (action.type) {
      case 'UPDATE_CURRENT_PRODUCT_STYLE_INDEX':
        return action.payload;
      default:
        return previousState;
    }
  },

  currentProductStarsReducer: (previousState = 0, action) => {
    switch (action.type) {
      case 'UPDATE_CURRENT_PRODUCT_STARS':
        return action.payload;
      default:
        return previousState;
    }
  }
}

export default funcs;
