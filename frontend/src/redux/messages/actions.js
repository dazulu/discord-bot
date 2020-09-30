import { ADD_MESSAGE } from "./types";

export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message,
    };
};
