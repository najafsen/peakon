import { selectManagersState, selectManagersItems, selectFlattenedManagersItems } from "./managers.selector";
import managers from '../fixtures/employees';
import flattenedManagers from '../fixtures/employeesFlattened';

describe('Managers Selectors', () => {
    let state;
    beforeEach(() => {
        state = {
            managers: {
                pending: false,
                items: managers,
                error: null
            }
        };
    });

    test('#selectManagersState', () => {
        expect(selectManagersState(state)).toEqual(state.managers);
    });

    test('#selectManagersItems', () => {
        expect(selectManagersItems(state)).toEqual(state.managers.items);
    });

    test('#selectFlattenedManagersItems', () => {
        expect(selectFlattenedManagersItems(state)).toEqual(flattenedManagers);
    });
});