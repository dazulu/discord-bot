import {
    createMessagePayload,
    replaceUserIds,
    replaceEmojiIds,
    getImageAttachments,
} from "../";
import {
    mockedTextMessage,
    mockedDirectMessage,
    mockedUserIds,
    mockedMessageObj,
    mockedImageAttachmentMessage,
    mockedNonImageAttachmentMessage,
} from "./mocks";

describe("createMessagePayload function", () => {
    it("generates payload for type 'text", () => {
        const actual = createMessagePayload(mockedTextMessage);
        expect(actual).toEqual({
            server: "Beets",
            username: "guybrush",
            discriminator: "000",
            source: "general",
            images: [],
            content: "I wanna be a pirate!",
        });
    });

    it("generates payload for type 'dm", () => {
        const actual = createMessagePayload(mockedDirectMessage);
        expect(actual).toEqual({
            server: null,
            username: "guybrush",
            discriminator: "000",
            source: "dm",
            images: [],
            content: "I wanna be a pirate!",
        });
    });

    it("generates payload with image attachements", () => {
        const actual = createMessagePayload(mockedImageAttachmentMessage);
        expect(actual).toEqual({
            server: null,
            username: "guybrush",
            discriminator: "000",
            source: "dm",
            images: [
                { url: "some-url", width: 100 },
                { url: "some-other-url", width: 200 },
            ],
            content: "I wanna be a pirate!",
        });
    });

    it("generates payload without image attachements", () => {
        const actual = createMessagePayload(mockedNonImageAttachmentMessage);
        expect(actual).toEqual({
            server: null,
            username: "guybrush",
            discriminator: "000",
            source: "dm",
            images: [],
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

describe("getImageAttachments function", () => {
    it("gets image URLs when image(s) attached", () => {
        const actual = getImageAttachments(
            mockedImageAttachmentMessage.attachments
        );
        expect(actual).toEqual([
            { url: "some-url", width: 100 },
            { url: "some-other-url", width: 200 },
        ]);
    });

    it("ignores attachment if it has no width", () => {
        const actual = getImageAttachments(
            mockedNonImageAttachmentMessage.attachments
        );
        expect(actual).toEqual([]);
    });
});
