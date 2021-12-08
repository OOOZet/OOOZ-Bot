const { MessageEmbed } = require("discord.js");

module.exports = (msg, cmd, ...args) => {
    if (cmd === "ping") {
        msg.reply("Pong!")
    }
    
    if (cmd === "info") {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`info`)
            .setDescription('Bot powstał dzięki:\nKrzysiek ツ#3885, AndrekM#1810, AXTART#5447, Info Cube#6039, olix3001#0075 i inni\nNa razie istniej tylko funkcja ożywania czatu ale to start a i jeszcze !ping')
            .setTimestamp();
        msg.reply({ embeds: [embed] })
    }
}