module.exports = (client, message) => {
  const config = require('../config.json');
  const JSONdb = require('simple-json-db');
  const db = new JSONdb('../db.json');
  // Ignore all bots
  if (message.author.bot) return;
  // if (message.member.user.username === 'Luk') {
  //   if (!db.get('lockdownstate')) {
  //     message.reply('💩 <- to ty').catch(console.error);
  //   }
  //   return;
  // }
  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;
  // Our standard argument/command name definition.
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (db.get('lockdownstate')) {
    if (
      (command === 'unlock' &&
        message.member.user.username === 'InfoX' &&
        message.member.user.discriminator === '1337') ||
      (command === 'unlock' &&
        message.member.user.username === 'olix3001' &&
        message.member.user.discriminator === '0075')
    ) {
      db.set('lockdownstate', false);
      client.user.setActivity('Dark Souls II', { type: 'COMPETING' });
      client.user.setStatus('online');
      const { MessageEmbed } = require('discord.js');
      const lockdownMSG = new MessageEmbed()
        .setColor('#28d918')
        .setTitle('OOOZet bot unlock')
        .setAuthor('OOOZet bot', '', 'https://github.com/OOOZ-community')
        .addFields({
          name: 'Unlock status:',
          value: 'Bot successfully unlocked!',
        })
        .setTimestamp()
        .setFooter('Made with brain, by ' + config.creator);
      const lockdownDM = new MessageEmbed()
        .setColor('#28d918')
        .setTitle('OOOZet unlocked!')
        .setAuthor('OOOZet', '', 'https://github.com/OOOZ-community')
        .addFields({
          name: 'Lockdown status:',
          value: 'Bot currently unlocked!',
        })
        .setTimestamp()
        .setFooter('Made with brain, by ' + config.creator);
      message.author.send({ embeds: [lockdownDM] });
      message.reply({ embeds: [lockdownMSG] });
      return;
    }
    message.reply('The bot is currently in lockdown state!');
    return;
  }
  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
