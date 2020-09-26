require("dotenv").config();
import { prefix } from "../config.json";
import { logMessage } from "./utils";
import commands from "./commands/";

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

for (const command of commands) {
    client.commands.set(command.name, command);
}

client
    .login(process.env.DISCORD_BOT_TOKEN)
    .then(() => {
        console.log("Logged in!");
    })
    .catch(() => {
        console.log("Could not log in!");
    });

client.on("message", (message) => {
    logMessage(message);

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("++?????++ Out of Cheese Error.");
    }
});
