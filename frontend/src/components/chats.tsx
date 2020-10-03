import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Chat from "./chat";

const Chats = () => {
    const messages = useSelector(({ chat }: RootState) => chat.messages);

    const generateChats = () => {
        let markup = [];
        for (const key in messages) {
            markup.push(<Chat name={key} key={key} messages={messages[key]} />);
        }
        return markup;
    };

    return <main className="servers">{generateChats()}</main>;
};

export default Chats;
