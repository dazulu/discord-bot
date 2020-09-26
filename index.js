require("dotenv").config();

if (!process.env.DISCORD_BOT_TOKEN) throw Error("DISCORD_BOT_TOKEN not set");

const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
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

    if (message.content === "!badger") {
        message.channel.send("mash");
    }
});
