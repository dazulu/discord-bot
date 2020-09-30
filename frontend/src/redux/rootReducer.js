import { combineReducers } from "redux";

import messagesReducer from "./messages/reducer";

const rootReducer = combineReducers({
    chat: messagesReducer,
});

export default rootReducer;
