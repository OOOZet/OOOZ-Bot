const { MessageEmbed } = require("discord.js");
const axios = require('axios');
const signale = require("signale");

const liczenieId = process.env.LICZENIE_ID;

var num = 0;

module.exports = {
    init: async (client) => {
        if(num == 0) {
            const liczenie = await client.channels.fetch(liczenieId);
            liczenie.messages.fetch({limit: 2})
                .then(messageMappings => {
                    let messages = Array.from(messageMappings.values());
                    let previousMessage = messages[0];
                    num = Number.parseInt(previousMessage)+1;
                })
                .catch(error => console.log(error))
        }
    },

    msg: (msg) => {
        if (msg.channel.id == liczenieId) {
            if(num != Number.parseInt(msg.content)) {
                msg.delete();
            } else {
                ++num;
            }
        }
    }
}