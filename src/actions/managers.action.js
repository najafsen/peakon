import { getManagers } from "../services/managers.service";
import { createAction } from "../lib/actions.lib";

export const LOAD_MANAGERS_START = 'LOAD_MANAGERS_START'
export const LOAD_MANAGERS_SUCCESS = 'LOAD_MANAGERS_SUCCESS'
export const LOAD_MANAGERS_ERROR = 'LOAD_MANAGERS_ERROR'

export const loadManagersStart = () =>  createAction(LOAD_MANAGERS_START);
export const loadManagersSuccess = (managers) =>  createAction(LOAD_MANAGERS_SUCCESS, managers);
export const loadManagersError = (error) =>  createAction(LOAD_MANAGERS_ERROR, error);

export const loadManagers = () => async (dispatch) => {
    dispatch(loadManagersStart());

    try {
        const managers = await getManagers();
        dispatch(loadManagersSuccess(managers));
    }
    catch (err) {
        dispatch(loadManagersError(err));
        throw err;
    }
}