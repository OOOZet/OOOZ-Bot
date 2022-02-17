require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = process.env.PREFIX;

const signale = require('signale');
const { info } = require('signale/types');

signale.config({
    displayFilename: true,
    displayTimestamp: true,
    displayDate: false
});

// // configure logs to save into file instead of console
// const fs = require('fs');
// const path = require('path');
// var logFile = fs.createWriteStream(path.join(__dirname, '..', "output.log"), { flags: 'w' });
// process.stdout.pipe(logFile);


const { reaction } = require('./events/Suggestions');
const logs = require('./logs');
const recovery = require('./recovery');

const modules = {
    deadChat: require('./events/message/DeadChat'),
    command: require('./events/Command'),
    fun: require('./events/Fun'),
    suggestions: require('./events/Suggestions'),
    botSuggestions: require('./events/BotSuggestions'),
    diary: require('./events/Diary'),
    moderation: require('./events/Moderation'),
    scam: require('./events/Scam'),
    counting: require('./events/message/Counting'),
};

client.on('ready', () => {

    client.user.setPresence({
        activities: [{ name: "OKI", type: "WATCHING" }]
    });

    signale.success(`Bot logged in as ${client.user.tag}`);

    logs.botReady(client);

    const fs = require('fs');
    fs.readFile('suggestionRecovery.txt', 'utf8', (err, data) => {
        if (data && data.length !== 0) {
            const lines = data.split('\n')
            for (let i = 0; i < lines.length - 1; i++) {
                recovery.recoverSuggestion(client, lines[i].split(','))
            }
        }
    })
});

client.on("messageCreate", async msg => {
    if (msg.author.bot /*|| modules.scam(client, msg) - not working right now*/) return;
    if (msg.content.startsWith(prefix)) {
        const [cmdName, ...args] = msg.content
            .trim()
            .substring(prefix.length)
            .split(/\s+/);

        modules.command(client, msg, cmdName, ...args);
        modules.fun(msg, cmdName, ...args);
        modules.diary(client, msg, cmdName, ...args);
        //modules.moderation(client, msg, cmdName, ...args);
    }
    //modules.suggestions.create(msg, client);
    //modules.botSuggestions.create(msg, client);
    modules.deadChat(msg, client);
    modules.counting(msg, client);
});

client.login(process.env.TOKEN);

