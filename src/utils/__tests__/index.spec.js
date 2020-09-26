import { withPrefix } from "../";

it("usePrefix adds correct prefix", () => {
    const result = withPrefix("foo");
    expect(result).toBe("!foo");
});
