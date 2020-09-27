import React from "react";

const Chat = ({ server, username, discriminator, source, content }) => {
    return (
        <div>
            <span className="source">[{source}]</span>
            <span className="username">{username}</span>
            <span className="discriminator">#{discriminator}: </span>
            <span
                className="message"
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </div>
    );
};

export default Chat;
