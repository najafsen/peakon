import managersReducer, { MANAGERS_INITIAL_STATE } from './managers.reducer';
import { loadManagersStart, loadManagersSuccess, loadManagersError } from '../actions/managers.action';

describe('Managers Reducers', () => {
    test('loading start', () => {
        expect(managersReducer(MANAGERS_INITIAL_STATE, loadManagersStart())).toEqual({ pending: true, error: null, items: { data: [], included: [] } });
    });

    test('loading done', () => {
        const payload = { some: 'payload' };
        expect(managersReducer(MANAGERS_INITIAL_STATE, loadManagersSuccess(payload))).toEqual({ pending: false, error: null, items: payload });
    });

    test('loading fail', () => {
        const payload = 'The error';
        expect(managersReducer(MANAGERS_INITIAL_STATE, loadManagersError(payload))).toEqual({ pending: false, error: payload, items: { data: [], included: [] } });
    });

    test('any other action', () => {
        expect(managersReducer(MANAGERS_INITIAL_STATE, { type: 'some action', payload: 'not in reducer', meta: 'and meta' })).toEqual(MANAGERS_INITIAL_STATE);
    });
});