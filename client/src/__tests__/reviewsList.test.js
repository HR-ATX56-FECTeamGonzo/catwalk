// import React from 'react';
const React = require('react');
const {component, useState} = require('react');
const { render, cleanup } = require('@testing-library/react');
const Jest = require('@testing-library/jest-dom/extend-expect');
const reviewsList = require('../components/ratings_reviews/ReviewsList.js');

let getByTestId;

describe('ReviewsList', () => {
  it('should be a functional component', () => {
    expect(reviewsList.render).toBeFalsy();
  });
});