export const replaceUserIds = (message, log) => {
    let logWithUsernames = log;

    const matches = log.matchAll(/<@!?(\d+)>/g);
    const mentions = Array.from(matches);

    if (mentions) {
        for (const i in mentions) {
            const userString = mentions[i][0];
            const userId = mentions[i][1];
            const user = message.client.users.cache.get(userId);

            if (user && user.username) {
                logWithUsernames = logWithUsernames.replace(
                    userString,
                    `@${user.username}`
                );
            }
        }
    }

    return logWithUsernames;
};

export const logMessage = (message) => {
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

    console.log(
        replaceUserIds(
            message,
            `${source} ${username}#${discriminator}: ${content}`
        )
    );
};
