export const replaceUserIds = (msgObject, msgString) => {
    let withUsernames = msgString;

    const matches = [...msgString.matchAll(/<@!?(\d+)>/g)];

    for (const i in matches) {
        const userString = matches[i][0];
        const userId = matches[i][1];
        const user = msgObject.client.users.cache.get(userId);

        if (user && user.username) {
            withUsernames = withUsernames.replace(
                userString,
                `@${user.username}`
            );
        }
    }

    return withUsernames;
};

export const replaceEmojiIds = (msgString) => {
    let withEmojiStrings = msgString;
    const matches = [...msgString.matchAll(/<a?:(\w+):\w+>/g)];

    for (const i in matches) {
        withEmojiStrings = withEmojiStrings.replace(
            matches[i][0],
            `<span class="custom-emoji">${matches[i][1]}</span>`
        );
    }

    return withEmojiStrings;
};

export const getImageAttachments = (attachments) =>
    attachments.reduce((images, item) => {
        if (item.width && typeof item.width === "number") {
            return [
                ...images,
                { url: item.url, width: item.width, height: item.height },
            ];
        }
        return [...images];
    }, []);

export const createMessagePayload = (msgObject) => {
    const {
        channel: { type, name },
        author: { username, discriminator },
        content,
    } = msgObject;

    let source;
    if (type === "text") {
        source = `${name}`;
    } else {
        source = `${type}`;
    }
    const withUsernames = replaceUserIds(msgObject, content);
    const withEmojiName = replaceEmojiIds(withUsernames);

    const messagePayload = {
        server: msgObject.guild ? msgObject.guild.name : null,
        username: `${username}`,
        discriminator,
        source,
        images: getImageAttachments(msgObject.attachments),
        content: withEmojiName,
    };

    // console.log(messagePayload);
    return messagePayload;
};
