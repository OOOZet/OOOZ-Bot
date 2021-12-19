const { MessageEmbed } = require('discord.js');

const dzienniczekId = '885820716732276756';

module.exports = async (client, msg, cmd, ...args) => {
  if (
    cmd == 'diary-help' ||
    cmd == 'end-of-voting' ||
    cmd == 'suggestion-making' ||
    cmd == 'suggestion'
  )
    if (msg.member.roles.cache.find((r) => r.name === 'Admin')) {
      switch (cmd) {
        case 'diary-help':
          const embed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle(`Diary help`)
            .setDescription(
              `
                        - end-of-voting <link-to-suggestion> <votes(2/1/0)(↑/↓/-)>
                        - suggestion-making <link-to-suggestion> <mentions(@infuś @olix3001)> <describtion>
                        - suggestion <link-to-suggestion> <votes(2/1/0)(↑/↓/-)> <mentions(@infuś @olix3001)> <describtion>
                    `
            )
            .setTimestamp();
          msg.reply({ embeds: [embed] });
          break;
        case 'end-of-voting':
          if (args.length == 2) {
            const diary = await client.channels.fetch(dzienniczekId);
            const results = args[1].split('/');
            var outcome;
            if (parseInt(results[0], 10) > parseInt(results[1], 10))
              outcome = 'Tak';
            else outcome = 'Nie';
                        const now = new Date()  
                        const date = Math.round((now.getTime() + (now.getTimezoneOffset() * 60 * 1000)) / 1000)  
                        const replay = `**__Koniec głosowania nad sugestią__**\n**Data:** <t:${date}>\n**Link do sugestii:** ${args[0].toString()}\n**Sprawca:** ${msg.member}\n**Wynik:** ${args[1].toString()}\n**Czy przeszła?:** ${outcome}`;
                        diary.send(replay)
                        try {
                            (async () => {
                                const embed = await new MessageEmbed()
                                    .setColor('NOT_QUITE_BLACK')
                                    .setTitle('Voting results')
                                    .setImage(`https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20%22type%22%3A%20%22outlabeledPie%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22labels%22%3A%20%5B%22for%22%2C%20%22against%22%2C%20%22abstain%22%5D%2C%0A%20%20%20%20%22datasets%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%5B%22%2313a813%22%2C%20%22%23a61212%22%2C%20%22%23dde009%22%5D%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B${results[0]}%2C%20${results[1]}%2C%20${results[2]}%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%2C%0A%20%20%22options%22%3A%20%7B%0A%20%20%20%20%22plugins%22%3A%20%7B%0A%20%20%20%20%20%20%22legend%22%3A%20false%2C%0A%20%20%20%20%20%20%22outlabels%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22text%22%3A%20%22%25l%20%25p%22%2C%0A%20%20%20%20%20%20%20%20%22color%22%3A%20%22white%22%2C%0A%20%20%20%20%20%20%20%20%22stretch%22%3A%2035%2C%0A%20%20%20%20%20%20%20%20%22font%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22resizable%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%22minSize%22%3A%2012%2C%0A%20%20%20%20%20%20%20%20%20%20%22maxSize%22%3A%2018%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D`)
                                    .setTimestamp();
                                diary.send({ embeds: [embed] })
                            })();
                        } catch (e) {
                            msg.reply('cannot create a chart!');
                        }
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
                        try {
                            (async () => {
                                const embed = await new MessageEmbed()
                                    .setColor('NOT_QUITE_BLACK')
                                    .setTitle('Voting results')
                                    .setImage(`https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20%22type%22%3A%20%22outlabeledPie%22%2C%0A%20%20%22data%22%3A%20%7B%0A%20%20%20%20%22labels%22%3A%20%5B%22for%22%2C%20%22against%22%2C%20%22abstain%22%5D%2C%0A%20%20%20%20%22datasets%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%5B%22%2313a813%22%2C%20%22%23a61212%22%2C%20%22%23dde009%22%5D%2C%0A%20%20%20%20%20%20%20%20%22data%22%3A%20%5B${results[0]}%2C%20${results[1]}%2C%20${results[2]}%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%2C%0A%20%20%22options%22%3A%20%7B%0A%20%20%20%20%22plugins%22%3A%20%7B%0A%20%20%20%20%20%20%22legend%22%3A%20false%2C%0A%20%20%20%20%20%20%22outlabels%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22text%22%3A%20%22%25l%20%25p%22%2C%0A%20%20%20%20%20%20%20%20%22color%22%3A%20%22white%22%2C%0A%20%20%20%20%20%20%20%20%22stretch%22%3A%2035%2C%0A%20%20%20%20%20%20%20%20%22font%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22resizable%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%22minSize%22%3A%2012%2C%0A%20%20%20%20%20%20%20%20%20%20%22maxSize%22%3A%2018%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D`)
                                    .setTimestamp();
                                diary.send({ embeds: [embed] })
                            })();
                        } catch (e) {
                            msg.reply('cannot create a chart!');
                        }
    
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
