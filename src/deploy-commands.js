/*
Commands are located in the commands folder

To create a new command, just add a file
to said folder with a function that has a message
as argument, and a module.exports like so:

function onCommand(message){}

module.exports = {
    name: "SomeCommandName",
    description: "SomeCommandDescription",
    execute: onCommand
}

I just route the original message on discord to the
command, so be weary of that when doing sketchy things
*/

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

// the list command, has to access all commands so no dedicated file
function list(message) {
    let repl = "List of available commands:\n\n";

    for (const command of commands) {
        repl += `**${command.name}**: ${command.description}\n`;
    }

    message.reply(repl);
}

// util function
function beginsWith(string, what) {
    return (string.slice(0, what.length) == what);
}

// main entrypoint, this gets called whenever a message is sent in discord, might be slow, might not be, idk
function handleMessage(message) {
    // check for bots and non-commands
    if (message.author.bot || !beginsWith(message.content, "!")) return;

    // fancy javascript string manip, get full command name without prefix or arguments
    let commandName = message.content.split(" ", 1)[0].slice(prefix.length);

    // handle list command
    if (commandName == "list") {
        list(message); return;
    }

    // execute corresponding command
    for (const command of commands) {
        if (command.name != commandName) continue;

        command.execute(message);
        return;
    }

    // if command doesn't exist, reply with this, not really necessary though
    // message.reply(`Command '${commandName}' does not exist, did you spell it correctly?`);
}

module.exports = handleMessage;