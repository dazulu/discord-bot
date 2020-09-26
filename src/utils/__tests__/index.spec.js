import { logMessage, replaceUserIds } from "../";
import {
    mockedTextMessage,
    mockedDirectMessage,
    mockedUserIds,
    mockedMessageObj,
} from "./mocks";

describe("logMessage function", () => {
    const consoleSpy = jest.spyOn(console, "log");

    it("logs message for type 'text", () => {
        logMessage(mockedTextMessage);
        expect(consoleSpy).toHaveBeenCalledWith(
            "[#general] guybrush#000: I wanna be a pirate!"
        );
    });

    it("logs message for type 'dm", () => {
        logMessage(mockedDirectMessage);
        expect(consoleSpy).toHaveBeenCalledWith(
            "(dm) guybrush#000: I wanna be a pirate!"
        );
    });
});

describe("replaceUserIds function", () => {
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
