import React, { useState } from "react";
import { constrainDimensions } from "../lib/images";

const Video = ({ url, width, height }) => {
    const [collapsed, setCollapsed] = useState(false);

    const handleClick = (e) => {
        /*
         *  Don't want URL to open on click
         *  but allow right click for image context menu
         */
        e.preventDefault();
        setCollapsed(!collapsed);
    };

    // We're basically constraining to an area of 300 x 300 or less
    const { constrainedWidth, constrainedHeight } = constrainDimensions(
        width,
        height,
        300
    );

    return (
        <>
            {collapsed ? (
                <span class="item--collapsed" onClick={handleClick}>
                    Show Video
                </span>
            ) : (
                <video
                    controls
                    width={constrainedWidth}
                    height={constrainedHeight}
                    src={url}
                    className="message-attachment"
                />
            )}
        </>
    );
};

export default Video;
