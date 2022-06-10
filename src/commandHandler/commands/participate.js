const participants = [];

function addParticipant(message) {
    let author = message.author.tag;
    let commandLength = message.content.split(" ")[0].length + 1;
    let content = message.content.slice(commandLength);

    if (content.length == 0) {
        return 1;
    }

    for (let i = 0; i < participants.length; i++) {
        if (participants[i].name == author) return 2;
    }

    let dude = {
        name: author,
        content: content
    }

    participants.push(dude);

    return 0;
}

function onCommand(message) {
    let result = addParticipant(message);

    let reply = "You're are now a participant! 👍\n\n";

    // if an error occurred
    if (result) {
        reply = "**Something went wrong: **";

        switch (result) {
            case 1:
                reply += "You didnt specify what you want to demo. Just add something after the command; *!participate [My epic idea here]*\n";
                break;
            case 2:
                reply += "You are already participating silly ;)\n";
                break;
        }

        reply += "\n\n";
    }

    // if (result) reply = "Your are now a participant! 👍\n\n";
    // else reply = "Something went wrong! Did you add a description? ;)\n\n";

    reply += "Current participants:\n";

    for (let p of participants) {
        reply += `**${p.name}**\n`;
    }

    message.reply(reply);

    return;
}

module.exports = {
    name: "participate",
    description: "Run this command with a description of what you want to demo to get a chance to be able to give a demo rin the next CodeClub meeting",
    run: onCommand
}