const { removeFirstWord } = require("../../utils.js");

function onCommand(message) {
    if (!message.member.permissionsIn(message.channel).has("ADMINISTRATOR")) {
        message.channel.send("No priveliges");
        return;
    }

    let argument = removeFirstWord(message.content)
    let num = parseInt(argument);

    if (!num) {
        message.channel.send("Argument wasn't a number, was of type " + typeof (argument));
        return;
    }

    if (num < 2) message.channel.send("**Please give a number equal to or higher than 2**");
    if (num > 100) message.channel.send("**Please give a number equal to or lower than 100**");

    message.channel.bulkDelete(num, true);

    return;
}

module.exports = {
    name: "purge",
    description: "A command that removes a certain number of messages from that point up. Can't remove messages older than 14 days!!",
    run: onCommand
}