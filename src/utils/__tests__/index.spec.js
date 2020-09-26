import { logMessage } from "../";

describe("logMessage function", () => {
    const consoleSpy = jest.spyOn(console, "log");

    it("logs value for type 'text", () => {
        logMessage({
            channel: { type: "text", name: "general" },
            author: { username: "guybrush", discriminator: "000" },
            content: "I wanna be a pirate!",
        });
        expect(consoleSpy).toHaveBeenCalledWith(
            "[#general] guybrush#000: I wanna be a pirate!"
        );
    });

    it("logs value for type 'dm", () => {
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
