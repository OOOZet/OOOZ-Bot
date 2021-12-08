require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '>';

const signale = require('signale');
const Suggestions = require('./events/Suggestions');

const modules = {
    deadChat: require('./events/message/DeadChat'),
    command: require('./events/Command'),
    suggestions: require('./events/Suggestions')
};

client.on('ready', () => {

    client.user.setPresence({
        activities: [{ name: "OKI", type: "WATCHING" }]
    });

    signale.success(`Bot logged in as ${client.user.tag}`);
});

client.on("messageCreate", async msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(prefix)) {
        const [cmdName, ...args] = msg.content
            .trim()
            .substring(prefix.length)
            .split(/\s+/);
        
        modules.command(msg, cmdName, ...args);
    }
    modules.suggestions(msg, client);
    modules.deadChat(msg, client);
});

client.login(process.env.TOKEN)
