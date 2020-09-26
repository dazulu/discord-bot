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

    const log = `${source} ${username}#${discriminator}: ${content}`;

    console.log(message);
    console.log(log);
};
