const fs = require("fs");
const path = require("path");

const commandPath = "commands";

function getCommands() {
    const pathToFiles = path.join(__dirname, commandPath);
    const files = fs.readdirSync(pathToFiles);
    const out = [];

    for (const file of files) {
        out.push(require(`${pathToFiles}/${file}`));
    }

    return out;
}

const commands = getCommands();

const prefix = "!";

function list(message) {
    let repl = "List of available commands:\n\n";

    for (const command of commands) {
        repl += `**${command.name}**: ${command.description}\n`;
    }

    message.reply(repl);
}

function beginsWith(string, what) {
    return (string.slice(0, what.length) == what);
}

function handleMessage(message) {
    if (message.author.bot || !beginsWith(message.content, "!")) return;

    let commandName = message.content.split(" ", 1)[0].slice(prefix.length);

    if (commandName == "list") {
        list(message); return;
    }

    for (const command of commands) {
        if (!command.name == commandName) continue;

        command.execute(message);
        return;
    }
}

module.exports = handleMessage;