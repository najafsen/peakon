import { LOAD_MANAGERS_START, LOAD_MANAGERS_ERROR, LOAD_MANAGERS_SUCCESS } from "../actions/managers.action"

export const MANAGERS_INITIAL_STATE = {
    pending: false,
    items: [],
    error: null
}

export default (state = MANAGERS_INITIAL_STATE, action) => {
    switch(action.type) {
        case LOAD_MANAGERS_START: return {...state, pending: true};
        case LOAD_MANAGERS_SUCCESS: return {...state, pending: false, items: action.payload}
        case LOAD_MANAGERS_ERROR: return {...state, pending: false, error: action.payload}
        default: return state;
    }
}