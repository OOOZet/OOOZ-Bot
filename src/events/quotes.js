const { MessageEmbed } = require('discord.js');
const axios = require('axios');

const deadTime = 43_200_000; // 43_200_000

const quoteChannelId = process.env.BOT_CYTATY_ID;

module.exports = (client) => {
    setInterval(async () => {
        let quote = (await axios.get('https://programming-quotes-api.herokuapp.com/Quotes/random')).data;
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`~ ${quote.author}`)
            .setDescription(quote.en)
            .setTimestamp();
            
        (await client.channels.fetch(quoteChannelId)).send({ embeds: [embed] });
    }, deadTime);

};