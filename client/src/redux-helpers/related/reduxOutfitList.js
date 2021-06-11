const funcs = {
  updateCurrentProductId: (id) => ({
    type: 'UPDATE_CURRENT_PRODUCT_ID',
    payload: id,
  }),

  currentProductIdReducer: (previousState = 0, action) => {
    switch (action.type) {
      case 'UPDATE_CURRENT_PRODUCT_ID':
        return action.payload;
      default:
        return previousState;
    }
  },
  addOutfit: (outfitObj) => ({
    type: 'ADD_OUTFIT',
    payload: outfitObj
  }),

  deleteOutfit: (index) => ({
    type: 'DELETE_OUTFIT',
    payload: index
  }),

  outfitListReducer: (previousState = [], action) => {
    switch (action.type) {
      case 'ADD_OUTFIT':
        return [...previousState.outfitList, payload.outfitObj];
      case 'DELETE_OUTFIT':
        return [...previousState.outfitList.slice(0, payload.index), ...previousState.outfitList.slice(payload.index + 1)];
      default:
        return previousState;
    }
  },
};

export default funcs;
