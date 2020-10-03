import React, { useEffect, useRef } from "react";
import { MessageProps } from "../redux/store";
import Message from "./message";

interface ChatProps {
    name: string;
    messages: MessageProps[];
}

const Chat: React.FC<ChatProps> = ({ name, messages = [] }) => {
    const chatEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if (chatEl && chatEl.current) {
                chatEl.current.scrollTop = chatEl.current.scrollHeight;
            }
        });
    }, [messages]);

    return (
        <div className={`column ${name === "misc" ? "column-misc" : ""}`}>
            <h2 className="column-name">{name}</h2>
            <div className="chat" ref={chatEl}>
                {messages.map((message, i) => (
                    <Message key={i} {...message} />
                ))}
            </div>
        </div>
    );
};

export default Chat;
