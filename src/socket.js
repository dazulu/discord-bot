require("dotenv").config();
import Discord from "discord.js";
import { prefix, clientConfig } from "./config.json";
import { createMessagePayload } from "./utils";
import commands from "./commands";

const discordClient = new Discord.Client(clientConfig);

discordClient.commands = new Discord.Collection();
for (const command of commands) {
    discordClient.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

discordClient
    .login(process.env.DISCORD_BOT_TOKEN)
    .then(() => {
        console.log("Logged in!");
    })
    .catch(() => {
        console.log("Could not log in!");
    });

const socket = (io) => {
    io.on("connection", (client) => {
        console.log("s:", "New Connection");

        // socket event for client subscription
        client.on("subscribeToMessageEvent", () => {
            console.log("s:", "subscribeToMessageEvent");
            discordClient.on("message", (message) => {
                const messagePayload = createMessagePayload(message);
                console.log("sm:", message.content);
                client.emit("new message", messagePayload);

                if (!message.content.startsWith(prefix) || message.author.bot) {
                    return;
                }

                const args = message.content
                    .slice(prefix.length)
                    .trim()
                    .split(/ +/);
                const commandName = args.shift().toLowerCase();
                const command =
                    discordClient.commands.get(commandName) ||
                    discordClient.commands.find(
                        (cmd) =>
                            cmd.aliases && cmd.aliases.includes(commandName)
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
                    setTimeout(
                        () => timestamps.delete(message.author.id),
                        cooldownAmount
                    );
                }

                try {
                    command.execute(message, args);
                } catch (error) {
                    console.error(error);
                    message.reply("++?????++ Out of Cheese Error.");
                }
            });
        });

        client.on("disconnect", () => {
            console.log("Socket disconnected.");
        });
    });
};

module.exports = socket;
