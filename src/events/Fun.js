const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");
const { await } = require("signale/types");

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
            msg.reply(`<https://lmddgtfy.net/?q=${args.join('+')}>`);
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
        case "guess-me":
            try {
                (async () => {
                    if (args.length > 0 && args[0].match(/^[a-zA-Z]+$/)) {
                        const age = await (await axios.get(`https://api.agify.io/?name=${args[0]}`)).data;
                        const gender = await (await axios.get(`https://api.genderize.io?name=${args[0]}`)).data;
                        const nation = await (await axios.get(`https://api.nationalize.io?name=${args[0]}`)).data;
                        msg.reply(`I think you are ${age.age ? `${age.age} years old` : "not a"} ${gender.gender || "person"} from ${nation.country.length > 0 ? nation.country[0].country_id : "this universe"}`)
                    } else {
                        msg.reply('Invalid characters were used');
                    }      
                })();
            } catch (e) {
                msg.reply('something went wrong!');
            }
            break
        case "im-bored": 
            try {
                (async () => {
                    const data = await (await axios.get(`https://www.boredapi.com/api/activity`)).data;
                    const embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(data.type.toString())
                        .setDescription(data.activity.toString())
                        .setFooter(`data from boredapi.com`)
                        .setTimestamp();
                    msg.reply({ embeds: [embed] })
                })();
            } catch (e) {
                msg.reply('something went wrong!');
            }
            break
        case "qr":
            try {
                (async () => {
                    const embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(args[0].toString())
                        .setImage(`https://api.qrserver.com/v1/create-qr-code/?data=${args[0]}`)
                        .setFooter(`data from goqr.me`)
                        .setTimestamp();
                    msg.reply({ embeds: [embed] })
                })();
            } catch (e) {
                msg.reply('something went wrong!');
            }
            break
        case "motivation":
            try {
                (async () => {
                    const data = await (await axios.get(`https://www.affirmations.dev`)).data;
                    const embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('Motivation')
                        .setDescription(data.affirmation.toString())
                        .setFooter(`data from affirmations.dev`)
                        .setTimestamp();
                    msg.reply({ embeds: [embed] })
                })();
            } catch (e) {
                msg.reply('something went wrong!');
            }
            break
        case "crypto":
            try {
                (async () => {
                    let crypto = 'btc'
                    if(args.length > 0)
                        crypto = args[0]

                        const data = await (await axios.get(`https://api.cryptonator.com/api/ticker/${crypto}-usd`)).data;
                    const embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setDescription(parseFloat(data.ticker.price, 10).toFixed(2).toString()+"$")
                        .setTitle(crypto)
                        .setFooter(`data from api.cryptonator.com`)
                        .setTimestamp();
                    msg.reply({ embeds: [embed] })
                })();
            } catch (e) {
                msg.reply('something went wrong!');
            }
            break
        case "fact":
            try {
                (async () => {
                    const data = await (await axios.get(`https://uselessfacts.jsph.pl/random.json?language=en`)).data;
                    const embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setDescription(data.text.toString())
                        .setTitle('Fact')
                        .setFooter(`data from uselessfacts.jsph.pl`)
                        .setTimestamp();
                    msg.reply({ embeds: [embed] })
                })();
            } catch (e) {
                msg.reply('something went wrong!');
            }
            break
    }
}
