const { MessageEmbed } = require("discord.js");

const beginDate = Date.now();

module.exports = (msg, cmd, ...args) => {
    if (cmd === "ping") {
        msg.reply("Pong! `" + (Math.abs(Date.now() - msg.createdTimestamp)) + "ms`");
    }

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
                - komendy ping, info i uptime
            `)
            .setTimestamp();
        msg.reply({ embeds: [embed] })
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