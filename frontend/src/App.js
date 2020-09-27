import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
    const [socket, setSocket] = useState(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    // manage socket connection
    const handleSocketConnection = () => {
        if (socketConnected) socket.disconnect();
        else {
            socket.connect();
        }
    };

    // establish socket connection
    useEffect(() => {
        setSocket(io("http://localhost:4000"));
    }, []);

    // subscribe to the socket event
    useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => {
            setSocketConnected(socket.connected);
            socket.emit("subscribeToMessageEvent");
        });
        socket.on("disconnect", () => {
            setSocketConnected(socket.connected);
        });
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on("new message", (message) => {
                setMessages([...messages, message]);
            });
        }
    }, [socket, messages]);

    return (
        <>
            <div>
                <b>Connection status:</b>{" "}
                {socketConnected ? "Connected" : "Disconnected"}
            </div>
            <input
                type="button"
                value={socketConnected ? "Disconnect" : "Connect"}
                onClick={handleSocketConnection}
            />
            <div className="column">
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
