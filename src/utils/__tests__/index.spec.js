import { logMessage, replaceUserIds, replaceEmojiIds } from "../";
import {
    mockedTextMessage,
    mockedDirectMessage,
    mockedUserIds,
    mockedMessageObj,
} from "./mocks";

describe("logMessage function", () => {
    it("logs message for type 'text", () => {
        const actual = logMessage(mockedTextMessage);
        expect(actual).toEqual({
            server: "Beets",
            username: "guybrush",
            discriminator: "000",
            source: "general",
            content: "I wanna be a pirate!",
        });
    });

    it("logs message for type 'dm", () => {
        const actual = logMessage(mockedDirectMessage);
        expect(actual).toEqual({
            server: null,
            username: "guybrush",
            discriminator: "000",
            source: "dm",
            content: "I wanna be a pirate!",
        });
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

describe("replaceEmojiIds function", () => {
    it("replaces an emoji ID's with a string value", () => {
        const mockedLog = "<a:pepeFeet:64368713> sup?";
        const actual = replaceEmojiIds(mockedLog);
        expect(actual).toEqual(
            '<span class="custom-emoji">pepeFeet</span> sup?' // eslint-disable-line quotes
        );
    });

    it("replaces multiple emoji ID's with string values", () => {
        const mockedLog =
            "Hello <a:pepeFeet:5123> and <:appleGrin:1234><:lul:5151>";
        const actual = replaceEmojiIds(mockedLog);
        expect(actual).toEqual(
            'Hello <span class="custom-emoji">pepeFeet</span> and <span class="custom-emoji">appleGrin</span><span class="custom-emoji">lul</span>' // eslint-disable-line quotes
        );
    });
});
