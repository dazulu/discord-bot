import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

function App() {
    const [socket, setSocket] = useState(null);
    const container = useRef(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    const connect = () => {
        if (!socketConnected) {
            console.log("c:", "connect");
            socket.connect();
            setSocketConnected(true);
        }
    };

    const disconnect = () => {
        if (socketConnected) {
            console.log("c:", "disconnect");
            socket.disconnect();
            setSocketConnected(false);
        }
    };

    // establish socket connection
    useEffect(() => {
        console.log("c:", "establish socket connection");
        setSocket(io("http://localhost:4000"));
    }, []);

    // subscribe to the socket event
    useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => {
            console.log("c:", "connect");
            setSocketConnected(socket.connected);
            socket.emit("subscribeToMessageEvent");
        });
        socket.on("disconnect", () => {
            console.log("c:", "disconnect");
            setSocketConnected(socket.connected);
        });

        return () => {
            if (socket) {
                socket.off("connect");
                socket.off("disconnect");
            }
        };
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on("new message", (message) => {
                console.log("c:", "new message");
                setMessages([...messages, message]);
                container.current.scrollTop = container.current.scrollHeight;
            });
        }

        return () => {
            if (socket) socket.off("new message");
        };
    }, [socket, messages]);

    return (
        <>
            <div>
                <b>Connection status:</b>{" "}
                {socketConnected ? "Connected" : "Disconnected"}
            </div>
            <input
                type="button"
                value="Connect"
                onClick={connect}
                disabled={socketConnected}
            />
            <input
                type="button"
                value="Disconnect"
                onClick={disconnect}
                disabled={!socketConnected}
            />
            <div className="column" ref={container}>
                {messages.map(
                    (
                        { server, username, discriminator, source, content },
                        i
                    ) => (
                        <div key={i}>
                            <span className="server">{server}</span>
                            <span className="source">[{source}]</span>
                            <span className="username">{username}</span>
                            <span className="discriminator">
                                #{discriminator}:{" "}
                            </span>
                            <span
                                className="message"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                    )
                )}
            </div>
        </>
    );
}

export default App;
