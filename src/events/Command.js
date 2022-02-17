const { MessageEmbed } = require('discord.js');
const fs = require('fs');

const beginDate = Date.now();
const adminRoleId = process.env.ADMIN_ROLE_ID;
const modRoleId = process.env.MOD_ROLE_ID;

module.exports = (client, msg, cmd, ...args) => {
  const embed = new MessageEmbed();
  switch(cmd) {
    case "info":
      embed = new MessageEmbed()
        .setColor('BLURPLE')
        .setTitle(`info`)
        .setDescription(
          `
                  Bot powstał dzięki:
                  \`🐧Info Cube#6039🐧\`, \`👑olix3001#0075👑\`, \`Krzysiek ツ#3885\`, \`AndrekM#1810\`, \`AXTART#5447\`, \`InfoX#1337\`  i inni
                  Aktualne funkcje:
                  - ożywianie czatu
                  - sugestie
                  - komendy ping, info, uptime i inne
              `
        )
        .setTimestamp();
      msg.reply({ embeds: [embed] });
      break;

    case "help":
      fs.readFile('help.txt', (err, data) => {
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`help`)
          .setDescription(data.toString())
          .setTimestamp();
        msg.reply({ embeds: [embed] });
      });
      break;

    case "uptime":
      embed = new MessageEmbed()
        .setColor('BLURPLE')
        .setTitle(`Uptime`)
        .setDescription(
          `
                  bot went online <t:${Math.round(beginDate / 1000)}:R>
              `
        )
        .setFooter(`PID ${process.pid}`)
        .setTimestamp();
      msg.reply({ embeds: [embed] });
      break;

    case "alarm":
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`alarm`)
        .setDescription(
          ` <@${adminRoleId}>
            <@${modRoleId}> 
            Potrzebna natychmiastowa interwnecja!!!
          `
        )
        .setThumbnail(msg.author.displayAvatarURL())
        .setFooter(`autor: ${msg.author.tag}`)
        .setTimestamp();
      msg.reply({ embeds: [embed] });
      var admins = msg.guild.roles.cache.get(adminRoleId)?.members.map(m=>m.user.id);
      var mods = msg.guild.roles.cache.get(modRoleId)?.members.map(m=>m.user.id);
      adminsAndMods = Array.from(new Set(admins.concat(mods)));
      for(let i=0; i<adminsAndMods.length; ++i) {
        if(adminsAndMods[i] != undefined) {
          client.users.fetch(adminsAndMods[i], false).then((user) => {
            user.send("https://c.tenor.com/EDeg5ifIrjQAAAAC/alarm-better-discord.gif");
            user.send("Potrzebna natychmiastowa interwnecja na OOOZ!!!");
            user.send(`<@${user.id}>`);
          });
        }
      } 
      break;
  }
};