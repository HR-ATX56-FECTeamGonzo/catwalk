const outfitFuncs = {
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
        return previousState.outfitList.concat(action.payload);
      case 'DELETE_OUTFIT':
        return [...previousState.outfitList.slice(0, action.payload), ...previousState.outfitList.slice(action.payload + 1)];
      default:
        return previousState;
    }
  },
};

export default outfitFuncs;
