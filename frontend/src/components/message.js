import React from "react";
import Image from "./image";

const Chat = ({ username, discriminator, source, images, content }) => {
    return (
        <div>
            <span className="source">[{source}]</span>
            <span className="username">{username}</span>
            <span className="discriminator">#{discriminator}: </span>
            {content && (
                <span
                    className="message"
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            )}
            {images && images.map((image, i) => <Image {...image} key={i} />)}
        </div>
    );
};

export default Chat;
