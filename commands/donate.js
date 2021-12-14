exports.run = (client, msg, args) => {
  const config = require('../config.json');
  const { MessageEmbed } = require('discord.js');
  const donateEmbed = new MessageEmbed()
    .setColor('#6824b5')
    .setTitle('OOOZet donate')
    .setAuthor(config.creator, '', 'https://github.com/OOOZ-community')
    .addFields(
      {
        name: 'Donates',
        value:
          'Hi, i am so glad that you want to donate something, let me guide you thgrough the process',
      },
      {
        name: 'Crypto donate',
        value: 'Donate with crypto: Send any crypto to this adress [adress]',
        inline: true,
      },
      { name: 'PSC', value: 'Send to ' + config.creator, inline: true }
    )
    .setTimestamp()
    .setFooter('Made with brain, by ' + config.creator);
  msg.author.send({ embeds: [donateEmbed] });
  const donateMSG = new MessageEmbed()
    .setColor('#6824b5')
    .setTitle('OOOZet donate')
    .setAuthor('OOOZet')
    .addFields({
      name: 'Check your dms',
      value:
        'Also make sure your dms are on: privacy -> allow DMs from server members',
    })
    .setTimestamp()
    .setFooter('Made with brain, by ' + config.creator);
  msg.reply({ embeds: [donateMSG] });
};
