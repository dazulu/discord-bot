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

export const mockedAttachmentsMessage = {
    channel: { type: "text", name: "general" },
    author: { username: "guybrush", discriminator: "000" },
    guild: { name: "Beets" },
    attachments: [
        {
            name: "foo",
            url: "some-image.jpg",
            width: 100,
            height: 100,
        },
        {
            name: "bar",
            url: "some-other-image.gif",
            width: 200,
            height: 200,
        },
        {
            name: "vid",
            url: "some-video-url.mp4",
            width: 300,
            height: 300,
        },
        {
            name: "boop",
            url: "some-weird-thing",
            width: 400,
            height: 400,
        },
    ],
    content: "",
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
