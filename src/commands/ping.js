import { cooldown } from "../config.json";

const ping = {
    name: "ping",
    description: "The bot replies to your ping.",
    execute(message) {
        message.channel.send("Pong.");
    },
    cooldown,
};

export default ping;
