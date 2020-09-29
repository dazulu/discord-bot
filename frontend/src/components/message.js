import React from "react";
import Image from "./image";
import Video from "./video";

const Chat = ({ username, discriminator, source, videos, images, content }) => {
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
            {videos && videos.map((video, i) => <Video {...video} key={i} />)}
        </div>
    );
};

export default Chat;
