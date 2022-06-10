const CONFIG = require("../../config.json");

function onCommand(message) {
    // do some magic
}

module.exports = {
    name: "storeChannel",
    description: "Stores the channel in a 'database' for future use. (Database being a json file on the server -_-)",
    run: onCommand
}