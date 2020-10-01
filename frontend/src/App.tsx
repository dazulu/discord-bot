import React, { useEffect, useState } from "react";

import Chats from "./components/chats";
import Header from "./components/header";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { MessageAction } from "./redux/store";

function App() {
    const dispatch = useDispatch();
    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    const [socketConnected, setSocketConnected] = useState(false);

    const connect = () => {
        if (socket && !socketConnected) {
            socket.connect();
            setSocketConnected(true);
        }
    };

    const disconnect = () => {
        if (socket && socketConnected) {
            socket.disconnect();
            setSocketConnected(false);
        }
    };

    // establish socket connection
    useEffect(() => {
        setSocket(io("http://localhost:4000"));
    }, []);

    // subscribe to the socket event
    useEffect(() => {
        if (!socket) {
            return;
        } else {
            socket.on("connect", () => {
                console.log("connect");
                setSocketConnected(socket.connected);
                socket.emit("subscribeToMessageEvent");
            });
            socket.on("disconnect", () => {
                console.log("disconnect");
                setSocketConnected(socket.connected);
            });
        }

        return () => {
            if (socket) {
                socket.off("connect");
                socket.off("disconnect");
            }
        };
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on("new message", (message: any) => {
                dispatch<MessageAction>({ type: "ADD_MESSAGE", message });
            });
        }

        return () => {
            if (socket) {
                socket.off("new message");
            }
        };
    }, [socket, dispatch]);

    return (
        <>
            <Header
                connect={connect}
                disconnect={disconnect}
                socketConnected={socketConnected}
            />
            <Chats />
        </>
    );
}

export default App;
