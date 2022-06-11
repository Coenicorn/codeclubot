const Discord = require("discord.js");

// expects token.json to exist within the same directory, json structure:
// {"TOKEN": "[insert token here]"}
const CONFIG = require("./token.json");
const handleCommands = require("./commandHandler/handleCommands.js");

// create Discord client
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILDS
    ]
});

const channels = [];
channels["general"] = client.channels.cache.find(channel => channel.id == CONFIG.CHANNELS.general);

// yay! executed succesfully!
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// handle messages
client.on("messageCreate", message => {
    handleCommands(message);
});

// magic token action here
client.login(CONFIG.TOKEN);