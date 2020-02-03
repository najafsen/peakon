import React from 'react';
import { FetchMock } from '@react-mock/fetch';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'
import rootReducer from '../reducers';

export const withRedux = (ui, state = {}) => {
    const store = createStore(rootReducer, state, applyMiddleware(thunk));
    return (<Provider store={store}>{ui}</Provider>);
}

export const withFetchMock = (ui, fetchMockOptions = {}) => {
    return (<FetchMock {...fetchMockOptions}>{ui}</FetchMock>);
}

export const createMockStore = (initialState) => {
    return configureStore([thunk])(initialState);
}