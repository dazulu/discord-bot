import React, { useState, useEffect } from "react";
import Chat from "./chat";

/*
 * ToDo: Refactor message storage into Redux because this is uggggly
 */

const Chats = ({ message }) => {
    const [messagesByServer, setMessagesByServer] = useState({
        misc: [],
    });

    const generateChats = (items) => {
        let jsx = [];
        for (const key in items) {
            jsx.push(<Chat name={key} messages={items[key]} />);
        }
        return jsx;
    };

    useEffect(() => {
        const serverName = message.server;
        if (message && serverName) {
            if (!messagesByServer[serverName]) {
                setMessagesByServer({
                    ...messagesByServer,
                    [serverName]: [message],
                });
            } else {
                setMessagesByServer({
                    ...messagesByServer,
                    [serverName]: [...messagesByServer[serverName], message],
                });
            }
        } else if (message.content) {
            setMessagesByServer({
                ...messagesByServer,
                misc: [...messagesByServer.misc, message],
            });
        }
    }, [message]);

    return <main className="servers">{generateChats(messagesByServer)}</main>;
};

export default Chats;
