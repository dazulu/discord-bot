export const scrollIntoView = (element) => {
    if (!element) return;
    // ToDo: Throttle this. Lots of messages at once would call it lots
    element.scrollIntoView(false);
};

// scroll to ends of all chat windows on new message
export const scrollAll = (target) => {
    if (document) {
        [...document.querySelectorAll(target)].forEach((chatWindow) => {
            if (chatWindow.lastChild) {
                scrollIntoView(chatWindow.lastChild);
                // giving image an extra second and trying again
                // scroll otherwise happens before image has taken up space
                setTimeout(() => scrollIntoView(chatWindow.lastChild), 1000);
            }
        });
    }
};
