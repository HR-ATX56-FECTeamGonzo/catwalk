//action creators
export const addOufit = (outfit) => ({
  type: 'ADD_OUTFIT',
  outfit
});

//reducers
export const addOutfitReducer = (previousState = [], action) => {
  switch (action.type) {
    case 'ADD_OUTFIT':
      return [...previousState.outfitList, { outfit: action.outfit }];
    default:
      return previousState;
  }
};