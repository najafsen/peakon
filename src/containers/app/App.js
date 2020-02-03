import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from '../../reducers';
import { Managers } from '../managers/Managers';
import './App.scss';

const store = createStore(rootReducer, applyMiddleware(thunk));

export const App = () => {
  return (
    <div className="app-component">
      <Provider store={store}>
        <Managers/>
      </Provider>
    </div>
  );
}
