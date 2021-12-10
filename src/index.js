require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '>';

const signale = require('signale');

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
const Suggestions = require('./events/Suggestions');

const logs = require('./logs');

const modules = {
    deadChat: require('./events/message/DeadChat'),
    command: require('./events/Command'),
    fun: require('./events/Fun'),
    suggestions: require('./events/Suggestions'),
    diary: require('./events/Diary')
};

client.on('ready', () => {

    client.user.setPresence({
        activities: [{ name: "OKI", type: "WATCHING" }]
    });

    signale.success(`Bot logged in as ${client.user.tag}`);

    logs.botReady(client);
});

client.on("messageCreate", async msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(prefix)) {
        const [cmdName, ...args] = msg.content
            .trim()
            .substring(prefix.length)
            .split(/\s+/);

        modules.command(msg, cmdName, ...args);
        modules.fun(msg, cmdName, ...args);
        modules.diary(client, msg, cmdName, ...args);
    }
    modules.suggestions.create(msg, client);
    modules.deadChat(msg, client);
});

client.login("OTE2NDA2NDQzNDQ2NTA5NjA4.YapsAg.N7lPXKIfK2s3X8ZgdP3YmpGRV-c")//process.env.TOKEN)