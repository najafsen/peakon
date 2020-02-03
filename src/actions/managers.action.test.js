import {loadManagers, loadManagersStart, loadManagersSuccess, loadManagersError} from './managers.action';
import managers from '../fixtures/employees';
import { createMockStore } from '../lib/test.lib';
import { MANAGERS_INITIAL_STATE } from '../reducers/managers.reducer';
import * as ManagersServce from '../services/managers.service';

describe('Managers Actions', () => {
    let store;
    beforeEach(() => {
        store = createMockStore({ managers: MANAGERS_INITIAL_STATE });
    });

    test('load managers success', (done) => {
        jest.spyOn(ManagersServce, 'getManagers').mockResolvedValueOnce(managers);
        store.dispatch(loadManagers()).then(() => {

            const actions = store.getActions();
            
            expect(actions[0]).toEqual(loadManagersStart());
            expect(actions[1]).toEqual(loadManagersSuccess(managers));

            done();
        });
    });

    test('load managers error', (done) => {
        jest.spyOn(ManagersServce, 'getManagers').mockRejectedValueOnce('some error');
        store.dispatch(loadManagers()).catch(() => {

            const actions = store.getActions();
            
            expect(actions[0]).toEqual(loadManagersStart());
            expect(actions[1]).toEqual(loadManagersError('some error'));

            done();
        });
    });
});