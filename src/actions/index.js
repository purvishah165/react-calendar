import { ADD_EVENT } from "../constants/action-types";
export function addEvent(payload) {
    return { type: ADD_EVENT, payload };
}

