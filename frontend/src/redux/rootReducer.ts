import { combineReducers } from "redux";

import messagesReducer from "./reducers/messagesReducer";
import colorReducer from "./reducers/colorReducer";

const rootReducer = combineReducers({
    chat: messagesReducer,
    colours: colorReducer,
});

export default rootReducer;
