//action creators
export const addOufit = (outfitObj) => ({
  type: 'ADD_OUTFIT',
  outfitObj
});

//reducers
export const addOutfitReducer = (previousState = [], action) => {
  switch (action.type) {
    case 'ADD_OUTFIT':
      return [...previousState.outfitList, action.outfitObj];
    default:
      return previousState;
  }
};