import { MessagesState, MessageAction } from "../store";

const INITIAL_STATE: MessagesState = {
    messages: {
        misc: [],
    },
};

const reducer = (
    state = INITIAL_STATE,
    action: MessageAction
): MessagesState => {
    switch (action.type) {
        case "ADD_MESSAGE":
            const message = action.message;
            const serverName = message.server;

            if (serverName) {
                if (!state.messages[serverName]) {
                    return {
                        messages: {
                            ...state.messages,
                            [serverName]: [message],
                        },
                    };
                } else {
                    return {
                        messages: {
                            ...state.messages,
                            [serverName]: [
                                ...state.messages[serverName],
                                message,
                            ],
                        },
                    };
                }
            } else if (message.content) {
                return {
                    messages: {
                        ...state.messages,
                        misc: [...state.messages.misc, message],
                    },
                };
            }
            break;
        default:
            return state;
    }

    return state;
};

export default reducer;
