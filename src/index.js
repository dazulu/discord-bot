require("dotenv").config();
import Discord from "discord.js";
import { prefix, clientConfig } from "../config.json";
import { logMessage } from "./utils";
import commands from "./commands/";

const client = new Discord.Client(clientConfig);

client.commands = new Discord.Collection();
for (const command of commands) {
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

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
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

    if (!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) return;
    } else {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("++?????++ Out of Cheese Error.");
    }
});
