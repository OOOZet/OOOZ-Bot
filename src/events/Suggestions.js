const { MessageEmbed } = require("discord.js");

const sugestieId = '706063478586212416';
const sugestieRoleId = '914501173329936405';

module.exports = {
    create: async (msg, client) => {
        const sugestie = await client.channels.fetch(sugestieId);

        if (msg.channel.id == sugestieId) {
            msg.delete()
            const embed = new MessageEmbed()
                .setColor('NOT_QUITE_BLACK')
                .setTitle(`Sugestia`)
                .setDescription(msg.content)
                .setThumbnail(msg.author.displayAvatarURL())
                .setFooter(`autor: ${msg.author.tag}`)
                .setTimestamp();
            if (msg.attachments.size > 0) embed.setImage(msg.attachments.first().url)

            await sugestie.send({ embeds: [embed] })
                .then(function (message) {
                    const sendingTime = Date.now();
                    message.react("🟩")
                    message.react("🟨")
                    message.react("🟥")
                });

            sugestie.send(`<@&${sugestieRoleId}> nowa sugestia!!!`);
        }
    },

    reaction: async (msg, reaction, client) => {
        // code for reactions here
    }
}