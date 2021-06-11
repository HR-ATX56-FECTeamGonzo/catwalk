//action creators
const addOufit = (outfitObj) => ({
  type: 'ADD_OUTFIT',
  outfitObj
});

//reducers
const addOutfitReducer = (previousState = [], action) => {
  switch (action.type) {
    case 'ADD_OUTFIT':
      return [...previousState.outfitList, action.outfitObj];
    default:
      return previousState;
  }
};

module.exports = {
  addOufit,
  addOutfitReducer
}