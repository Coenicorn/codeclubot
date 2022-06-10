// dynamically load command scripts from folder

const fs = require("fs");
const path = require("path");

/**
 * @returns {Object}
 * @param {String} path
 */
function loadCommands(commandPath) {
    const pathToFiles = path.join(__dirname, commandPath);
    const files = fs.readdirSync(pathToFiles);
    const commands = [];

    for (file of files) {
        const required = require(`${pathToFiles}/${file}`);
        commands.push(required);
    }

    return commands;
}

module.exports = loadCommands;