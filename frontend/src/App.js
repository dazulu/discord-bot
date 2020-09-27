import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Header from "./components/header";
import Message from "./components/message";

function App() {
    const [socket, setSocket] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [groupedMessages, setGroupedMessages] = useState({ misc: [] });

    const connect = () => {
        if (!socketConnected) {
            socket.connect();
            setSocketConnected(true);
        }
    };

    const disconnect = () => {
        if (socketConnected) {
            socket.disconnect();
            setSocketConnected(false);
        }
    };

    const renderChats = (items) => {
        let jsx = [];
        for (const key in items) {
            jsx.push(
                <div
                    className={`column ${key === "misc" ? "column-misc" : ""}`}
                >
                    <h2 className="column-name">{key}</h2>
                    <div className="chat">
                        {items[key].map((messages) => (
                            <Message key={key} {...messages} />
                        ))}
                    </div>
                </div>
            );
        }
        return jsx;
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
                setMessages([...messages, message]);

                const serverName = message.server;
                if (serverName) {
                    if (!groupedMessages[serverName]) {
                        setGroupedMessages({
                            ...groupedMessages,
                            [serverName]: [message],
                        });
                    } else {
                        setGroupedMessages({
                            ...groupedMessages,
                            [serverName]: [
                                ...groupedMessages[serverName],
                                message,
                            ],
                        });
                    }
                } else {
                    setGroupedMessages({
                        ...groupedMessages,
                        misc: [...groupedMessages.misc, message],
                    });
                }
            });
        }

        return () => {
            if (socket) socket.off("new message");
        };
    }, [socket, messages, groupedMessages]);

    return (
        <>
            <Header
                connect={connect}
                disconnect={disconnect}
                socketConnected={socketConnected}
            />
            <main className="servers">{renderChats(groupedMessages)}</main>
        </>
    );
}

export default App;
