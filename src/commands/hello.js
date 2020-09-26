const hello = {
    name: "hello",
    description: "hello",
    execute(message) {
        message.channel.send("Hey!");
    },
};

export default hello;
