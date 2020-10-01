import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

export interface AttachmentProps {
    url: string;
    width: number;
    height: number;
}

export interface MessageProps {
    server: string;
    username: string;
    discriminator: string;
    source: string;
    videos: AttachmentProps[];
    images: AttachmentProps[];
    content: string;
}

export interface MessagesState {
    messages: {
        misc: MessageProps[];
        [key: string]: MessageProps[];
    };
}

export interface MessageAction {
    type: "ADD_MESSAGE";
    message: MessageProps;
}

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools());

export default store;
