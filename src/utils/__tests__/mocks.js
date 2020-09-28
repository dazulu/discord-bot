export const mockedTextMessage = {
    channel: { type: "text", name: "general" },
    author: { username: "guybrush", discriminator: "000" },
    guild: { name: "Beets" },
    attachments: [],
    content: "I wanna be a pirate!",
};

export const mockedDirectMessage = {
    channel: { type: "dm" },
    author: { username: "guybrush", discriminator: "000" },
    attachments: [],
    content: "I wanna be a pirate!",
};

export const mockedImageAttachmentMessage = {
    channel: { type: "dm" },
    author: { username: "guybrush", discriminator: "000" },
    attachments: [
        {
            name: "foo",
            url: "some-url",
            width: 100,
            height: 100,
        },
        {
            name: "bar",
            url: "some-other-url",
            width: 200,
            height: 200,
        },
    ],
    content: "I wanna be a pirate!",
};

export const mockedNonImageAttachmentMessage = {
    channel: { type: "dm" },
    author: { username: "guybrush", discriminator: "000" },
    attachments: [
        {
            name: "bar",
            url: "some-non-image-url",
        },
    ],
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
