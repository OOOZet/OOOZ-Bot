require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const signale = require('signale');
const chalk = require('chalk');

client.on('ready', () => {
    signale.success(`Bot logged in as ${chalk.yellow.bold(client.user.tag)}`);
});

client.login(process.env.TOKEN);