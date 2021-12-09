const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = (msg, cmd, ...args) => {
    switch (cmd) {
        case "meme":
            msg.reply('https://cdn.discordapp.com/avatars/916406443446509608/aedd440a6d0b46121af786430211490e.webp');
            break
        case "google":
            msg.reply(`<https://letmegooglethat.com/?q=${args.join('+')}>`);
            break
        case "lmgtfy":
            msg.reply(`<https://lmgtfy.app/?q=${args.join('+')}>`);
            break
        case "infuś":
            msg.reply("https://www.youtube.com/c/InfoCube");
            break
        case "rick":
            msg.reply("<https://www.youtube.com/watch?v=dQw4w9WgXcQ>");
            break
        case "krzysiek":
            msg.reply("I use windows11 btw :3");
            break
        case "randomnft":
            try {
                (async () => {
                    const data = await (await axios.get(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${Math.floor(Math.random() * 10000)}&limit=1`)).data.assets[0];
                    const embed = new MessageEmbed()
                        .setColor('NOT_QUITE_BLACK')
                        .setTitle(data.name)
                        .setDescription(data.description)
                        .setImage(data.image_url)
                        .addField('Permalink', data.permalink)
                        .setFooter(`data from opensea api`)
                        .setTimestamp();
                    if (msg.attachments.size > 0) embed.setImage(msg.attachments.first().url)

                    msg.reply({ embeds: [embed] })
                })();
            } catch (e) {
                msg.reply('something went wrong!');
            }
            break
    }
}