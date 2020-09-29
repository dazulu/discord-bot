import {
    createMessagePayload,
    replaceUserIds,
    replaceEmojiIds,
    getAttachments,
} from "../";
import {
    mockedTextMessage,
    mockedDirectMessage,
    mockedUserIds,
    mockedMessageObj,
    mockedAttachmentsMessage,
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
            videos: [],
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
            videos: [],
            content: "I wanna be a pirate!",
        });
    });

    it("generates payload with attachments", () => {
        const actual = createMessagePayload(mockedAttachmentsMessage);
        expect(actual).toEqual({
            server: "Beets",
            username: "guybrush",
            discriminator: "000",
            source: "general",
            images: [
                {
                    url: "some-image.jpg",
                    width: 100,
                    height: 100,
                },
                {
                    url: "some-other-image.gif",
                    width: 200,
                    height: 200,
                },
            ],
            videos: [
                {
                    url: "some-video-url.mp4",
                    width: 300,
                    height: 300,
                },
            ],
            content: "",
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

describe("getAttachments function", () => {
    it("gets images", () => {
        const actual = getAttachments(
            mockedAttachmentsMessage.attachments,
            "images"
        );
        expect(actual).toEqual([
            {
                url: "some-image.jpg",
                width: 100,
                height: 100,
            },
            {
                url: "some-other-image.gif",
                width: 200,
                height: 200,
            },
        ]);
    });

    it("gets videos", () => {
        const actual = getAttachments(
            mockedAttachmentsMessage.attachments,
            "videos"
        );
        expect(actual).toEqual([
            {
                url: "some-video-url.mp4",
                width: 300,
                height: 300,
            },
        ]);
    });
});
