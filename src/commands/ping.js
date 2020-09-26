import { cooldown } from "../../config.json";

const ping = {
    name: "ping",
    description: "Ping!",
    execute(message) {
        message.channel.send("Pong.");
    },
    cooldown,
};

export default ping;
