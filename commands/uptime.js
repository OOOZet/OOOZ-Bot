const { MessageEmbed } = require('discord.js');
const db = require('../db');

exports.run = (client, msg, args) => {
  const embed = new MessageEmbed()
    .setColor('BLURPLE')
    .setTitle(`Uptime`)
    .setDescription(
      `
                bot went online <t:${Math.round(
                  db.get('startupdate') / 1000
                )}:R>
            `
    )
    .setFooter(`PID ${process.pid}`)
    .setTimestamp();
  msg.reply({ embeds: [embed] });
};
