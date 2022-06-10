async function onCommand(message) {
    message.channel.send("Test succes!");
}

module.exports = {
    name: "test",
    description: "A test command for development purposes!",
    run: onCommand
}