const Discord = require("discord.js");

const CONFIG = require("../config.json");
const handleCommands = require("./deploy-commands");

// create Discord client
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILDS
    ]
});

// yay! executed succesfully!
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// handle messages
client.on("messageCreate", message => {
    handleCommands(message);
});

// magic token action here
client.login(CONFIG.token);