const { Collection, Client, Intents } = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const JSONdb = require('simple-json-db');
const db = new JSONdb('../db.json');
const client = new Client({
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
});
client.on('ready', () => {
  console.log(`Successfully logged in as user: ${client.user.tag}`);
  if (db.get('lockdownstate')) {
    client.user.setActivity('Bot locked down', { type: 'LISTENING' });
    client.user.setStatus('idle');
  } else {
    client.user.setActivity('Dark Souls II', { type: 'COMPETING' });
    client.user.setStatus('online');
  }
});
client.config = config;
client.commands = new Collection();

const events = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'));
for (const file of events) {
  const eventName = file.split('.')[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

const commands = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));
for (const file of commands) {
  const commandName = file.split('.')[0];
  const command = require(`./commands/${file}`);
  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command);
}
client.login(config.token);
