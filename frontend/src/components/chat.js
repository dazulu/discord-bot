import React from "react";
import Message from "./message";

const Chat = ({ name, messages = [] }) => {
    return (
        <div className={`column ${name === "misc" ? "column-misc" : ""}`}>
            <h2 className="column-name">{name}</h2>
            <div className="chat">
                {messages.map((message) => (
                    <Message key={name} {...message} />
                ))}
            </div>
        </div>
    );
};

export default Chat;
