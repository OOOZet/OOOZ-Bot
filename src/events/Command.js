const { MessageEmbed } = require("discord.js");
const fs = require('fs');

const beginDate = Date.now();

module.exports = (msg, cmd, ...args) => {
    if (cmd === "info") {
        const embed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle(`info`)
            .setDescription(`
                Bot powstał dzięki:
                \`🐧Info Cube#6039🐧\`, \`👑olix3001#0075👑\`, \`Krzysiek ツ#3885\`, \`AndrekM#1810\`, \`AXTART#5447\`  i inni
                Aktualne funkcje:
                - ożywianie czatu
                - sugestie
                - komendy ping, info, uptime i inne
            `)
            .setTimestamp();
        msg.reply({ embeds: [embed] })
    }

    if (cmd === "help") {
        fs.readFile('help.txt', (err, data) => {
            const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`help`)
                .setDescription(data.toString())
                .setTimestamp();
            msg.reply({ embeds: [embed] })
        })
    }

    if (cmd === "uptime") {
        const embed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle(`Uptime`)
            .setDescription(`
                bot went online <t:${Math.round(beginDate / 1000)}:R>
            `)
            .setFooter(`PID ${process.pid}`)
            .setTimestamp();
        msg.reply({ embeds: [embed] })
    }
}