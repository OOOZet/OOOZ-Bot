require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = '!';

const signale = require('signale');

const modules = {
    deadChat: require('./events/message/DeadChat')
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
    }
    modules.deadChat(msg, client);
    
     if (cmd === "ping") {
      msg.reply("Pong!")
    }
  
    if (cmd === "info") {
      msg.reply(`Bot powstał dzięki:`)
      msg.reply(`Krzysiek ツ#3885, AndrekM#1810, AXTART#5447, Info Cube#6039, olix3001#0075 i inni`)
      msg.reply(`Na razie istniej tylko funkcja ożywania czatu ale to start a i jeszcze !ping  `)
    }
});

client.login(process.env.TOKEN)
