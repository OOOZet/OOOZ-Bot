exports.run = (client, msg, args) => {
  const config = require('../config.json');
  const db = require('../db.js');
  if (
    (msg.member.user.username === 'InfoX' &&
      msg.member.user.discriminator === '1337') ||
    (msg.member.user.username === 'olix3001' &&
      msg.member.user.discriminator === '0075')
  ) {
    db.set('lockdownstate', true);
    client.user.setStatus('idle');
    client.user.setActivity('Bot locked down', { type: 'LISTENING' });
    const { MessageEmbed } = require('discord.js');
    const lockdownMSG = new MessageEmbed()
      .setColor('#f01f18')
      .setTitle('OOOZet lockdown')
      .setAuthor('OOOZet')
      .addFields({
        name: 'Lockdown status:',
        value: 'Bot successfully locked down!',
      })
      .setTimestamp()
      .setFooter('Made with brain, by ' + config.creator);
    const lockdownDM = new MessageEmbed()
      .setColor('#f01f18')
      .setTitle('OOOZet lockdown')
      .setAuthor('OOOZet')
      .addFields({
        name: 'Lockdown status:',
        value: 'Bot currently locked down',
      })
      .setTimestamp()
      .setFooter('Made with brain, by ' + config.creator);
    msg.author.send({ embeds: [lockdownDM] }).catch((e) => {
      msg.reply('turn on your dms noob');
    });
    msg.reply({ embeds: [lockdownMSG] });
  } else {
    const { MessageEmbed } = require('discord.js');
    const errMSG = new MessageEmbed()
      .setColor('#f01f18')
      .setTitle('OOOZet lockdown fail')
      .setAuthor('OOOZet')
      .addFields({
        name: 'Lockdown status:',
        value: 'You do not have the permissions to lock down the bot',
      })
      .setTimestamp()
      .setFooter('Made with brain, by ' + config.creator);
    msg.reply({ embeds: [errMSG] });
  }
};
