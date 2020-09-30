import { combineReducers } from "redux";

import messagesReducer from "./reducers/messagesReducer";

const rootReducer = combineReducers({
    chat: messagesReducer,
});

export default rootReducer;
