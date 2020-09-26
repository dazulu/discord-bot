import { logMessage, replaceUserIds } from "../";

describe("logMessage function", () => {
    const consoleSpy = jest.spyOn(console, "log");

    it("logs message for type 'text", () => {
        logMessage({
            channel: { type: "text", name: "general" },
            author: { username: "guybrush", discriminator: "000" },
            content: "I wanna be a pirate!",
        });
        expect(consoleSpy).toHaveBeenCalledWith(
            "[#general] guybrush#000: I wanna be a pirate!"
        );
    });

    it("logs message for type 'dm", () => {
        logMessage({
            channel: { type: "dm" },
            author: { username: "guybrush", discriminator: "000" },
            content: "I wanna be a pirate!",
        });
        expect(consoleSpy).toHaveBeenCalledWith(
            "(dm) guybrush#000: I wanna be a pirate!"
        );
    });
});

describe("replaceUserIds function", () => {
    const mockedUserIds = ["12345", "56789"];
    const mockedMessageObj = {
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

    it("replaces a userId with a username", () => {
        const mockedLog = `Hello <@!${mockedUserIds[0]}>`;
        const actual = replaceUserIds(mockedMessageObj, mockedLog);
        expect(actual).toEqual("Hello @Guybrush");
    });

    it("replaces multiple userIds with usernames", () => {
        const mockedLog = `Hello <@!${mockedUserIds[0]}> and <@!${mockedUserIds[1]}>`;
        const actual = replaceUserIds(mockedMessageObj, mockedLog);
        expect(actual).toEqual("Hello @Guybrush and @Elaine");
    });
});
