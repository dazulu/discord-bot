import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Header from "./components/header";
import Chats from "./components/chats";
import Resizeme from "./components/resizeme";

function App() {
    const [socket, setSocket] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [message, setMessage] = useState({});

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

    // establish socket connection
    useEffect(() => {
        console.log("c:", "establish socket connection");
        setSocket(io("http://localhost:4000"));
    }, []);

    // subscribe to the socket event
    useEffect(() => {
        if (!socket) {
            return;
        }

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
            socket.on("new message", (message) => setMessage(message));
        }

        return () => {
            if (socket) {
                socket.off("new message");
            }
        };
    }, [socket]);

    return (
        <>
            <Header
                connect={connect}
                disconnect={disconnect}
                socketConnected={socketConnected}
            />
            <Resizeme />
            {/* <Chats message={message} /> */}
        </>
    );
}

export default App;
