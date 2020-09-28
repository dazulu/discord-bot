import React, { useState, useRef } from "react";

const Image = ({ url, width, height }) => {
    const imageEl = useRef(null);
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
    const getImageSize = (width, height) => {
        const constraint = 300;
        let newWidth, newHeight;

        if (width > height) {
            if (width > constraint) {
                newWidth = constraint;
                newHeight = height * (constraint / width);
            } else {
                newWidth = width;
                newHeight = height;
            }
        } else if (height > width) {
            if (height > constraint) {
                newHeight = constraint;
                newWidth = width * (constraint / height);
            } else {
                newWidth = width;
                newHeight = height;
            }
        } else {
            if (width > constraint) {
                newWidth = constraint;
                newHeight = constraint;
            } else {
                newWidth = width;
                newHeight = height;
            }
        }

        return { width: `${newWidth}px`, height: `${newHeight}px` };
    };

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
                        ref={imageEl}
                        className="image-attachment"
                        style={{ ...getImageSize(width, height) }}
                    />
                </a>
            )}
        </>
    );
};

export default Image;
