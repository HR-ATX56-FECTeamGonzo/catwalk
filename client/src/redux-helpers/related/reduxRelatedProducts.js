
const funcs = {
  updateCurrentProductId: (id) => ({
    type: 'UPDATE_CURRENT_PRODUCT_ID',
    payload: id,
  }),

  updateCurrentProductStyleIndex: (index) => ({
    type: 'UPDATE_CURRENT_PRODUCT_STYLE_INDEX',
    payload: index,
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
  }
};
export default funcs;
