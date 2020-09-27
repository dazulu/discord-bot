import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders connection status", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Connection status:/i);
    expect(linkElement).toBeInTheDocument();
});
