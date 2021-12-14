exports.run = (client, msg, args) => {
  const config = require('../config.json');
  const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
  } = require('discord.js');
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId('helpfact')
      .setLabel('Click here for facts')
      .setStyle('DANGER')
      .setDisabled(true)
  );
  const helpEmbed = new MessageEmbed()
    .setColor('#6824b5')
    .setTitle('OOOZet help')
    .setAuthor('OOOZet', '', 'https://github.com/OOOZ-community')
    .addFields(
      { name: 'q!join <giveaway_id> ', value: 'Join a giveaway' },
      {
        name: 'q!cg <channel> <length> <winners> <prize>',
        value: ' Creates a giveaway in a specified channel',
      },
      {
        name: 'q!ppoter <msg no.> <msg_without_spaces>',
        value: 'Pings ppotera with your custom message',
      },
      {
        name: 'q!donate',
        value: 'Sends info on how you can tip the developer.',
      }
    )
    .setTimestamp()
    .setFooter('Made with brain, by ' + config.creator);

  msg.channel.send({ embeds: [helpEmbed], components: [row], ephemeral: true });
};
