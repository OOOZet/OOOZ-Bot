const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const signale = require("signale");

const liczenieId = process.env.LICZENIE_ID;

module.exports = (msg, client) => {
    if (msg.channel.id == liczenieId) {
        msg.channel.messages.fetch({limit: 2})
            .then(messageMappings => {
                let messages = Array.from(messageMappings.values());
                let previousMessage = messages[1];
                if(Number.parseInt(previousMessage)+1 != Number.parseInt(msg.content)) msg.delete();
            })
            .catch(error => console.log(error))
    }
}
