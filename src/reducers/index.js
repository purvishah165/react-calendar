// src/js/reducers/index.js
import { ADD_EVENT } from "../constants/action-types";
const initialState = {
    events: []
};
function rootReducer(state = initialState, action) {
    if (action.type === ADD_EVENT) {
        return Object.assign({}, state, {
            events: state.events.concat(action.payload)
        });
    }
    return state;
}
export default rootReducer;
