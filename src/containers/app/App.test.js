import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
