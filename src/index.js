require("dotenv").config();
import { withPrefix } from "./utils";

const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
    console.log("Client ready!");
});

client
    .login(process.env.DISCORD_BOT_TOKEN)
    .then(() => {
        console.log("Logged in!");
    })
    .catch(() => {
        console.log("Could not log in!");
    });

client.on("message", (message) => {
    const {
        channel: { type, name },
        author: { username, discriminator },
        content,
    } = message;

    let source;
    if (type === "text") {
        source = `[#${name}]`;
    } else {
        source = `(${type})`;
    }

    const log = `${source} ${username}#${discriminator}: ${content}`;

    console.log(message);
    console.log(log);

    if (message.content === withPrefix("badger")) {
        message.channel.send("mash");
    }
});
