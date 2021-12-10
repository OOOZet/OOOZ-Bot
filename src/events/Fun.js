const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = (msg, cmd, ...args) => {
    switch (cmd) {
        case "meme":
            try {
                (async () => {
                    const data = await (await axios.get(`https://meme-api.herokuapp.com/gimme`)).data;
                    const embed = new MessageEmbed()
                        .setColor('NOT_QUITE_BLACK')
                        .setTitle("Meme")
                        .setImage(data.url)
                        .setFooter(`meme from Meme API`);
                    msg.reply({ embeds: [embed] })
                })();
            } catch (e) {
                msg.reply('something went wrong!');
            }
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
        case "stackoverflow":
            msg.reply(`<https://stackoverflow.com/search?q=${args.join('+')}>`);
            break
        case "randomnft":
            try {
                (async () => {
                    const data = await (await axios.get(`https://api.opensea.io/api/v1/assets?order_direction=desc&offset=${Math.floor(Math.random() * 10000)}&limit=1`)).data.assets[0];
                    const embed = new MessageEmbed()
                        .setColor('NOT_QUITE_BLACK')
                        .setTitle(data.name.toString())
                        .setDescription(data.description.toString())
                        .setImage(data.image_url)
                        .addField('Permalink', data.permalink)
                        .setFooter(`data from opensea api`)
                        .setTimestamp();

                    msg.reply({ embeds: [embed] })
                })();
            } catch (e) {
                msg.reply('something went wrong!');
            }
            break
        case "spoiler":
            msg.delete();
            var ans = ""
            for(let i=0; i<args.length; i++) {
                for(let j=0; j<args[i].length; j++) {
                    ans += "||"+args[i][j]+"||";
                }
                if(i != args.length-1) ans += "|| ||";
            }

            if(ans.length > 0 & ans.length <= 4000) {
                msg.channel.send(ans);
            }
            break
        case "ping":
            msg.reply("Pong! `" + (Math.abs(Date.now() - msg.createdTimestamp)) + "ms`");
            break
    }
}