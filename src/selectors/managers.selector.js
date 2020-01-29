import {createSelector} from 'reselect';

import {MANAGERS_INITIAL_STATE} from '../reducers/managers.reducer';

export const selectManagersState = (state) => state.managers || MANAGERS_INITIAL_STATE;

export const selectManagersItems = createSelector(
    selectManagersState,
    managersState => managersState.items
);