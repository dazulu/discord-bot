import { cooldown } from "../../config.json";

const hello = {
    name: "hello",
    aliases: ["hey", "hi", "hej", "sup"],
    description: "hello",
    execute(message) {
        message.channel.send("Hey!");
    },
    cooldown,
};

export default hello;
