import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { addMessage } from "./redux/messages/actions";
import Header from "./components/header";
import Chats from "./components/chats";

function App({ addMessage }) {
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
            socket.on("new message", (message) => {
                setMessage(message);
                addMessage(message);
            });
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
            <Chats message={message} />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        messages: state.chat.messages,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (message) => dispatch(addMessage(message)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
