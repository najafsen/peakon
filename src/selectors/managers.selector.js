import { createSelector } from 'reselect';

import { MANAGERS_INITIAL_STATE } from '../reducers/managers.reducer';

export const selectManagersState = (state) => state.managers || MANAGERS_INITIAL_STATE;

export const selectManagersItems = createSelector(
    selectManagersState,
    managersState => managersState.items
);

export const selectFlattenedManagersItems = createSelector(
    selectManagersItems,
    items => items.data.map(item => {
        const includedItem = items.included.find(includedItem => includedItem.id === item.id) || {};
        return { id: item.id, ...item.attributes, ...includedItem.attributes };
    })
);