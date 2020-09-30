import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "../hooks/useHeight";
import "../styles/resize.css";

const Resizeme = () => {
    const [open, toggleOpen] = useState(false);
    const [content, toggleContent] = useState(false);

    const [
        bind,
        {
            borderBoxSize: { blockSize },
        },
    ] = useMeasure();

    const springProps = useSpring({
        height: open ? blockSize : 0,
    });

    return (
        <>
            <button onClick={() => toggleOpen(!open)}>
                {open ? "Close" : "Open"}
            </button>
            <button onClick={() => toggleContent(!content)}>
                Toggle Content
            </button>
            <pre style={{ color: "#fff" }}>{blockSize}</pre>
            <animated.div className="wrapper" style={springProps}>
                <div {...bind} className="inner">
                    {content ? (
                        <div>
                            <ul>
                                <li>hello</li>
                                <li>hello</li>
                                <li>hello</li>
                                <li>hello</li>
                                <li>hello</li>
                                <li>hello</li>
                                <li>hello</li>
                                <li>hello</li>
                                <li>hello</li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <h3>Hello</h3>
                            <ul>
                                <li>hello</li>
                                <li>hello</li>
                            </ul>
                        </div>
                    )}
                </div>
            </animated.div>
        </>
    );
};

export default Resizeme;
