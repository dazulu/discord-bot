import Chat from "./chat";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Chats = () => {
    const messages = useSelector(({ chat }: RootState) => chat.messages);

    const generateChats = () => {
        let markup = [];
        for (const key in messages) {
            markup.push(<Chat name={key} messages={messages[key]} />);
        }
        return markup;
    };

    return <main className="servers">{generateChats()}</main>;
};

export default Chats;
