//action creators
const addOutfit = (outfitObj) => ({
  type: 'ADD_OUTFIT',
  payload: outfitObj
});

const deleteOutfit = (index) => ({
  type: 'DELETE_OUTFIT',
  payload: index
});

//reducers
const outfitListReducer = (previousState = [], action) => {
  switch (action.type) {
    case 'ADD_OUTFIT':
      return [...previousState.outfitList, payload.outfitObj];
    case 'DELETE_OUTFIT':
      return [...previousState.outfitList.slice(0, payload.index), ...previousState.outfitList.slice(payload.index + 1)];
    default:
      return previousState;
  }
};

module.exports = {
  addOutfit,
  deleteOutfit,
  outfitListReducer
};