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
        case "guess-my-age":
            try {
                (async () => {
                    if (args[0].match(/^[a-zA-Z]+$/)) {
                        const data = await (await axios.get(`https://api.agify.io/?name=${args[0]}`)).data;
                        msg.reply(`I think you are ${data.age} years old`)
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
        case "chart": 
            try {
                (async () => {
                    const data = await (await axios.get(`https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20%22type%22%3A%20%22outlabeledPie%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22labels%22%3A%20%5B%22for%22%2C%20%22against%22%2C%20%22indifferent%22%5D%2C%0A%20%20%20%20%22datasets%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%5B%22%2313a813%22%2C%20%22%23a61212%22%2C%20%22%23dde009%22%5D%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B${args[0]}%2C%20${args[1]}%2C%20${args[2]}%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%2C%0A%20%20%22options%22%3A%20%7B%0A%20%20%20%20%22plugins%22%3A%20%7B%0A%20%20%20%20%20%20%22legend%22%3A%20false%2C%0A%20%20%20%20%20%20%22outlabels%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22text%22%3A%20%22%25l%20%25p%22%2C%0A%20%20%20%20%20%20%20%20%22color%22%3A%20%22white%22%2C%0A%20%20%20%20%20%20%20%20%22stretch%22%3A%2035%2C%0A%20%20%20%20%20%20%20%20%22font%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22resizable%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%22minSize%22%3A%2012%2C%0A%20%20%20%20%20%20%20%20%20%20%22maxSize%22%3A%2018%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D`)).data;
                    const embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('Voting results')
                        .setImage(`https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20%22type%22%3A%20%22outlabeledPie%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22labels%22%3A%20%5B%22for%22%2C%20%22against%22%2C%20%22abstain%22%5D%2C%0A%20%20%20%20%22datasets%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%5B%22%2313a813%22%2C%20%22%23a61212%22%2C%20%22%23dde009%22%5D%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B${args[0]}%2C%20${args[1]}%2C%20${args[2]}%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%2C%0A%20%20%22options%22%3A%20%7B%0A%20%20%20%20%22plugins%22%3A%20%7B%0A%20%20%20%20%20%20%22legend%22%3A%20false%2C%0A%20%20%20%20%20%20%22outlabels%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22text%22%3A%20%22%25l%20%25p%22%2C%0A%20%20%20%20%20%20%20%20%22color%22%3A%20%22white%22%2C%0A%20%20%20%20%20%20%20%20%22stretch%22%3A%2035%2C%0A%20%20%20%20%20%20%20%20%22font%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22resizable%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%22minSize%22%3A%2012%2C%0A%20%20%20%20%20%20%20%20%20%20%22maxSize%22%3A%2018%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D`)
                        .setFooter(`data from quickchart.io`)
                        .setTimestamp();
                    msg.reply({ embeds: [embed] })
                })();
            } catch (e) {
                msg.reply('something went wrong!');
            }
            break
    }
}