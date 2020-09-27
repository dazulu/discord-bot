import { cooldown } from "../config.json";

const hello = {
    name: "hello",
    aliases: ["hey", "hi", "hej", "sup"],
    description: "The bot replies with a hello message.",
    execute(message) {
        message.channel.send("Hey!");
    },
    cooldown,
};

export default hello;
