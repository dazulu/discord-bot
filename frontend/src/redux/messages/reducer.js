import { ADD_MESSAGE } from "./types";

const INITIAL_STATE = {
    messages: [],
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message],
            };

        default:
            return state;
    }
};

export default reducer;
