import React, { useState } from "react";

const Image = ({ url, width }) => {
    const [collapsed, setCollapsed] = useState(false);

    const handleClick = (e) => {
        /*
         *  Don't want URL to open on click
         *  but allow right click for image context menu
         */
        e.preventDefault();
        setCollapsed(!collapsed);
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
                        src={url}
                        className="image-attachment"
                        style={{ width: width > 400 ? "400px" : `${width}px` }}
                    />
                </a>
            )}
        </>
    );
};

export default Image;
