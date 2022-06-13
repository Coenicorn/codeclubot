function onCommand(message) {
    message.reply("Work in progress...");
}

module.exports = {
    name: "participate",
    description: "A command to participate in the CodeClub demo group, issue the command with a subject and get a chance to give a demo in the the next meeting!",
    execute: onCommand
}