const { MessageEmbed } = require("discord.js");

const logsChannelId = '918512478701383681';
var logChannel = null;

module.exports = {
    async botReady(client) {
        logChannel = await client.channels.fetch(logsChannelId);

        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Bot startup / Restart`)
            .setDescription("OOOZet bot is now online!")
            .setTimestamp()
        logChannel.send({ embeds: [embed] });
    }
}