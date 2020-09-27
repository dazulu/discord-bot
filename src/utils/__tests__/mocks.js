export const mockedTextMessage = {
    channel: { type: "text", name: "general" },
    author: { username: "guybrush", discriminator: "000" },
    guild: { name: "Beets" },
    content: "I wanna be a pirate!",
};

export const mockedDirectMessage = {
    channel: { type: "dm" },
    author: { username: "guybrush", discriminator: "000" },
    content: "I wanna be a pirate!",
};

export const mockedUserIds = ["12345", "56789"];

export const mockedMessageObj = {
    client: {
        users: {
            cache: {
                get(id) {
                    if (id === mockedUserIds[0]) {
                        return { username: "Guybrush" };
                    } else if (id === mockedUserIds[1]) {
                        return { username: "Elaine" };
                    } else {
                        return "";
                    }
                },
            },
        },
    },
};
