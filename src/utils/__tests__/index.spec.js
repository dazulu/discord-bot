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
    const mockedUserId = "12345";
    const mockedLog = `Hello <@!${mockedUserId}>`;
    const mockedMessageObj = {
        client: {
            users: {
                cache: {
                    get(id) {
                        if (id === mockedUserId) {
                            return { username: "Guybrush" };
                        } else {
                            return "";
                        }
                    },
                },
            },
        },
    };

    it("replaces userIds with usernames", () => {
        const actual = replaceUserIds(mockedMessageObj, mockedLog);
        expect(actual).toEqual("Hello @Guybrush");
    });
});
