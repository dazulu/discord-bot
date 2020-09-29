import React, { useState } from "react";
import { constrainDimensions } from "../lib/images";

const Image = ({ url, width, height }) => {
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
                    Show Image
                </span>
            ) : (
                <a href={url} onClick={handleClick} rel="noopener noreferrer">
                    <img
                        alt=""
                        src={url}
                        className="message-attachment"
                        style={{
                            width: `${constrainedWidth}px`,
                            height: `${constrainedHeight}px`,
                        }}
                    />
                </a>
            )}
        </>
    );
};

export default Image;
