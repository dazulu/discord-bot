import React, { useState, useRef } from "react";

const Image = ({ url, width }) => {
    const imageEl = useRef(null);
    const [collapsed, setCollapsed] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const handleClick = (e) => {
        /*
         *  Don't want URL to open on click
         *  but allow right click for image context menu
         */
        e.preventDefault();
        setCollapsed(!collapsed);
    };

    const handleLoad = () => {
        if (loaded) return;
        setLoaded(true);

        if (imageEl) {
            const parentChatEl = imageEl.current.closest(".chat");
            if (parentChatEl) {
                parentChatEl.scrollTop = parentChatEl.scrollHeight;
            }
        }
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
                        className={`image-attachment ${loaded ? "loaded" : ""}`}
                        style={{ width: width > 400 ? "400px" : `${width}px` }}
                        onLoad={handleLoad}
                    />
                </a>
            )}
        </>
    );
};

export default Image;
