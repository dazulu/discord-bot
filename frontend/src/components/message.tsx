import React from "react";
import Image from "./image";
import Video from "./video";
import { MessageProps } from "../redux/store";

const Chat: React.FC<MessageProps> = ({
    username,
    discriminator,
    source,
    videos,
    images,
    content,
}) => {
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
            {images &&
                images.map((image, index) => <Image {...image} key={index} />)}
            {videos &&
                videos.map((video, index) => <Video {...video} key={index} />)}
        </div>
    );
};

export default Chat;
