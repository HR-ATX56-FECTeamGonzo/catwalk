const React = require('react');
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import { rootReducer } from '../store/store.js';
import App from '../components/App.js'
const { component, useState } = require('react');
const { cleanup } = require('@testing-library/react');
const Jest = require('@testing-library/jest-dom/extend-expect');

import axios from 'axios';
import outfitCard from '../components/related/OutfitCard.js';
import outfitFuncs from '../redux-helpers/related/reduxOutfitList.js';

// jest.mock(outfitCard)

// describe('OutfitsList', () => {
//   it('should add outfit card of current product on click', () => {
//     expect(reviewsList.render).toBeFalsy();
//   });
// });

// function render(
//   ui,
//   {
//     initialState,
//     store = createStore(outfitFuncs.outfitListReducer, initialState),
//     ...renderOptions
//   } = {}
// ) {
//   function Wrapper({ children }) {
//     return <Provider store={store}>{children}</Provider>
//   }
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
// }


describe('actions', () => {
  it('should create an action to add an outfit', () => {
    const text = { id: 1, name: '', category: '', styleName: '', styleId: '', originalPrice: '', salePrice: '', imageURL: '', averageStars: '' };
    const expectedAction = {
      type: 'ADD_OUTFIT',
      payload: text,
    };
    expect(outfitFuncs.addOutfit(text)).toEqual(expectedAction);
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(outfitFuncs.outfitListReducer(undefined, {})).toEqual([]);
  });

  it('should handle ADD_TODO', () => {
    expect(
      outfitFuncs.outfitListReducer([], {
        type: 'ADD_OUTFIT',
        payload: { id: 1, name: '', category: '', styleName: '', styleId: '', originalPrice: '', salePrice: '', imageURL: '', averageStars: '' }
      })
    ).toEqual([
      { id: 1, name: '', category: '', styleName: '', styleId: '', originalPrice: '', salePrice: '', imageURL: '', averageStars: '' }
    ]);

    expect(
      outfitFuncs.outfitListReducer([{ id: 1, name: '', category: '', styleName: '', styleId: '', originalPrice: '', salePrice: '', imageURL: '', averageStars: '' }
      ], {
        type: 'DELETE_OUTFIT',
        payload: 0
      })
    ).toEqual([]);
  });
});

// it('Renders the app with initialState', () => {
//   render(<App />, {
//     initialState: {
//       currentProductId: 24156,
//       currentProductStyleIndex: 0,
//       currentProductStars: 0,
//       outfitList: [{ name: 'Add to Outfit' }],
//     }
//   })

//   expect(screen.getByText(/add to outfit/i)).toBeInTheDocument()
// });