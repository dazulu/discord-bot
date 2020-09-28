import React, { useEffect, useRef } from "react";
import Message from "./message";

const Chat = ({ name, messages = [] }) => {
    const chatEl = useRef(null);

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
                {messages.map((message) => (
                    <Message key={name} {...message} />
                ))}
            </div>
        </div>
    );
};

export default Chat;
