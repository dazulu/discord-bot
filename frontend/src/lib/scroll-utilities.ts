export const scrollIntoView = (element: HTMLElement) => {
    if (!element) return;
    // ToDo: Throttle this. Lots of messages at once would call it lots
    element.scrollIntoView(false);
};

// scroll to ends of all chat windows on new message
export const scrollAll = (selector: string) => {
    if (document) {
        Array.from(document.querySelectorAll(selector)).forEach(
            (chatWindow) => {
                if (chatWindow.lastChild) {
                    const lastChild = chatWindow.lastChild as HTMLElement;
                    scrollIntoView(lastChild);
                    // giving image an extra second and trying again
                    // scroll otherwise happens before image has taken up space
                    setTimeout(() => scrollIntoView(lastChild), 1000);
                }
            }
        );
    }
};
