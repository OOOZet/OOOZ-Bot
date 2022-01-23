const { MessageEmbed } = require('discord.js');
const fs = require('fs');

const logsId = '708581344518733925';

module.exports = async (client, msg) => {
    
    if(msg.content.match("https:\/\/discord\.(com|gift|gg)|https:\/\/steamcommunity\.com", "i")) return false;
    else if(msg.content.match("https?:\/\/.*di.?s.*\.", "i")) return await deleteScam(client, msg);
    else if(msg.content.match("https?:\/\/.*n[il]tro.*\.", "i")) return await deleteScam(client, msg);
    else if(msg.content.match("https?:\/\/.*dr?i.{0,2}c.*\.", "i")) return await deleteScam(client, msg);
    else if(msg.content.match("https?:\/\/.*dl.?([cs]{0,1}).*\.", "i")) return await deleteScam(client, msg);
    else if(msg.content.match("https?:\/\/.*ds.?c.*\.", "i")) return await deleteScam(client, msg);
    else if(msg.content.match("https?:\/\/.*stea?r?[mn].*\.", "i")) return await deleteScam(client, msg);
    else if(msg.content.match("https?:\/\/.*free-?n[ilt][ilt].*\.", "i")) return await deleteScam(client, msg);
    else if(msg.content.match("asstralissteam\.org\.ru|cllscordapp\.fun|extrarg\.xyz|d1scord\.com|d1sc0rd\.com", "i")) return await deleteScam(client, msg);
    
    return false;
};

async function deleteScam(client, msg) {
    msg.delete();
    var logs = await client.channels.fetch(logsId);
    const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`USUNIĘTO SCAM`)
        .setDescription(msg.content)
        .setThumbnail(msg.author.displayAvatarURL())
        .setFooter(`scammer: ${msg.author.tag}`)
        .setTimestamp();
    await logs.send({ embeds: [embed] });
    return true;
}
