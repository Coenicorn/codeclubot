// crappy custom command handler lol

// get commands from command loader
const commands = require("./loader.js")("commands");
const { beginsWith } = require("../utils.js");

const prefix = "!";

function list(message) {
    let reply = "Commands:\n";
    for (let i = 0; i < commands.length; i++) {
        reply += `\n**${commands[i].name}**: ${commands[i].description}`;
    }
    message.channel.send(reply);
}

// runs on every message, might be a performance overhead but I don't really care lol
function onMessageInput(message) {
    let content = message.content.toLowerCase();

    // if users a bot, discriminate
    if (message.author.bot || !beginsWith(content, prefix)) return;

    // list command prehandler
    if (beginsWith(content, prefix + "list")) {
        list(message);
        return;
    }

    for (let i = 0; i < commands.length; i++) {
        let command = commands[i];

        // check if it's a valid command
        if (!beginsWith(content, prefix + command.name)) continue;

        // do the fancy command running thing
        command.run(message, arguments);

        return;
    }
}

module.exports = onMessageInput;