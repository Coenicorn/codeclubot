function onCommand(message) {
    message.reply("Hey there!");
}

module.exports = {
    name: "test",
    description: "A test command",
    execute: onCommand
};