import React from "react";
import { ReactComponent as Logo } from "../assets/forum.svg";

interface HeaderProps {
    socketConnected: boolean;
    connect: () => void;
    disconnect: () => void;
}

const Header: React.FC<HeaderProps> = ({
    socketConnected,
    connect,
    disconnect,
}) => {
    return (
        <header className="header">
            <h1 className="title">
                <Logo className="icon" />
                Discord Multi-Server
            </h1>
            <div>
                <input
                    className="button"
                    type="button"
                    value="Connect"
                    onClick={connect}
                    disabled={socketConnected}
                />
                <input
                    className="button"
                    type="button"
                    value="Disconnect"
                    onClick={disconnect}
                    disabled={socketConnected}
                />
            </div>
        </header>
    );
};

export default Header;
