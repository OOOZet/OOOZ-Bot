const { MessageEmbed } = require("discord.js");

const dzienniczekId = '885820716732276756';

module.exports = async (client, msg, cmd, ...args) => {
    if (cmd == 'diary-help' || cmd == 'end-of-voting' || cmd == 'suggestion-making' || cmd == 'suggestion') 
        if (msg.member.roles.cache.has((role) => role.name === "Admin")) {
            switch(cmd) {
                case 'diary-help':
                    const embed = new MessageEmbed()
                    .setColor('BLURPLE')
                    .setTitle(`Diary help`)
                    .setDescription(`
                        - end-of-voting <link-to-suggestion> <votes(2/1/0)(↑/↓/-)>
                        - suggestion-making <link-to-suggestion> <mentions(@infuś @olix3001)> <describtion>
                        - suggestion <link-to-suggestion> <votes(2/1/0)(↑/↓/-)> <mentions(@infuś @olix3001)> <describtion>
                    `)
                    .setTimestamp();
                    msg.reply({ embeds: [embed] })
                    break
                case 'end-of-voting':
                    if (args.length == 2) {
                        const diary = await client.channels.fetch(dzienniczekId);
                        const results = args[1].split("/");
                        var outcome
                        if(parseInt(results[0], 10) > parseInt(results[1], 10))
                            outcome = 'Tak'
                        else
                            outcome = 'Nie'

                        const now = new Date()  
                        const date = Math.round((now.getTime() + (now.getTimezoneOffset() * 60 * 1000)) / 1000)  
                        const replay = `**__Koniec głosowania nad sugestią__**\n**Data:** <t:${date}>\n**Link do sugestii:** ${args[0].toString()}\n**Sprawca:** ${msg.member}\n**Wynik:** ${args[1].toString()}\n**Czy przeszła?:** ${outcome}`;
                        diary.send(replay)
                    }
                    break
                case 'suggestion-making':
                    if (args.length > 1) {
                        const diary = await client.channels.fetch(dzienniczekId);
    
                        var perps = []
                        for (let i=0; i<msg.mentions.members.size; i++) {
                            perps.push(await Array.from(msg.mentions.members)[i])
                        }
                        var perpetrators = ''
                        for (let i=0; i<perps.length; ++i) {
                            perpetrators += `<@${perps[i][0]}>`
                        }
    
                        var describtionStart = perps.length+1
    
                        const now = new Date()
                        const date = Math.round((now.getTime() + (now.getTimezoneOffset() * 60 * 1000)) / 1000)  
                        const replay = `**__Wykonanie sugestii__**\n**Data:** <t:${date}>\n**Link do sugestii:** ${args[0]}\n**Sprawcy:** ${perpetrators}\n**Opis zmian:** ${args.slice(describtionStart).join(" ")}`;
                        diary.send(replay)
                    }
                    break
                case 'suggestion':
                    if(args.length > 1) {
                        const diary = await client.channels.fetch(dzienniczekId);
                        const results = args[1].split("/");
                        var outcome
                        if (parseInt(results[0], 10) > parseInt(results[1], 10)) outcome = 'Tak'
                        else outcome = 'Nie'
    
                        const now = new Date()  
                        const date = Math.round((now.getTime() + (now.getTimezoneOffset() * 60 * 1000)) / 1000)  
                        var replay = `**__Koniec głosowania nad sugestią__**\n**Data:** <t:${date}>\n**Link do sugestii:** ${args[0].toString()}\n**Sprawca:** ${msg.member}\n**Wynik:** ${args[1].toString()}\n**Czy przeszła?:** ${outcome}`;
                        diary.send(replay)
    
                        var perps = []
                        for (let i=0; i<msg.mentions.members.size; i++) {
                            perps.push(await Array.from(msg.mentions.members)[i])
                        }
                        var perpetrators = ''
                        for (let i=0; i<perps.length; ++i) {
                            perpetrators += `<@${perps[i][0]}>`
                        }
    
                        var describtionStart = perps.length+2
                        
                        replay = `**__Wykonanie sugestii__**\n**Data:** <t:${date}>\n**Link do sugestii:** ${args[0]}\n**Sprawcy:** ${perpetrators}\n**Opis zmian:** ${args.slice(describtionStart).join(" ")}`;
                        diary.send(replay)
                    }
                    break
            }
        } else {
            msg.reply("You don't have permission to use this command")
        }
}
