const { MessageEmbed } = require("discord.js");
const { await } = require("signale/types");

const sugestieBotId = process.env.SUGESTIE_BOT_ID;
const botDeveloperRoleId = process.env.BOTDEV_ROLE_ID;

module.exports = {
    create: async (msg, client) => {
        const botSugestie = await client.channels.fetch(sugestieBotId);

        if (msg.channel.id == sugestieBotId) {
            msg.delete()
            const embed = new MessageEmbed()
                .setColor('NOT_QUITE_BLACK')
                .setTitle(`Sugestia do bota`)
                .setDescription(msg.content)
                .setThumbnail(msg.author.displayAvatarURL())
                .setFooter(`autor: ${msg.author.tag}`)
                .setTimestamp();
            if (msg.attachments.size > 0) embed.setImage(msg.attachments.first().url)

            await botSugestie.send({ embeds: [embed] })
                .then(async function (message) {
                    message.react("🟩")
                    message.react("🟨")
                    message.react("🟥")
                    botSugestie.send(`<@&${botDeveloperRoleId}> nowa sugestia do bota!!!`);
                });
        }
    },
}