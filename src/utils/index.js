import config from "../../config.json";

export const withPrefix = (command) => {
    return `${config.prefix}${command}`;
};
