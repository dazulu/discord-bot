import React, { useState } from "react";
import { constrainDimensions } from "../lib/images";
import { AttachmentProps } from "../redux/store";

const Image: React.FC<AttachmentProps> = ({ url, width, height }) => {
    const [collapsed, setCollapsed] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
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
                <span className="item--collapsed" onClick={handleClick}>
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
