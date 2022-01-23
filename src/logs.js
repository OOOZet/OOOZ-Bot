const { MessageEmbed } = require("discord.js");

const botLogsChannelId = process.env.BOT_LOGS_ID;
var logChannel = null;

module.exports = {
    async botReady(client) {
        logChannel = await client.channels.fetch(botLogsChannelId);

        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Bot startup / Restart`)
            .setDescription("OOOZet bot is now online!")
            .setTimestamp()
        logChannel.send({ embeds: [embed] });
    }
}