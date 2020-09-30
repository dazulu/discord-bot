import Chat from "./chat";
import React from "react";
import { useSelector } from "react-redux";

const Chats = () => {
    const { messages } = useSelector((state) => state.chat);

    const generateChats = (items) => {
        let markup = [];
        for (const key in items) {
            markup.push(<Chat name={key} messages={items[key]} />);
        }
        return markup;
    };

    return <main className="servers">{generateChats(messages)}</main>;
};

export default Chats;
