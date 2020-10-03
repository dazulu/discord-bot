import React from "react";
import { useSelector } from "react-redux";
import { MessageProps } from "../redux/store";
import { RootState } from "../redux/store";
import Image from "./image";
import Video from "./video";

const Chat: React.FC<MessageProps> = ({
    username,
    discriminator,
    source,
    videos,
    images,
    content,
}) => {
    const colours = useSelector((state: RootState) => state.colours);

    let sourceColour = {};
    if (colours[source]) {
        sourceColour = {
            color: colours[source],
        };
    }

    return (
        <div>
            <span className="source" style={sourceColour}>
                [{source}]
            </span>
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
