const { MessageEmbed } = require("discord.js");

const sugestieId = '706063478586212416';
const dzienniczekId = '885820716732276756';

module.exports = {
    async recoverSuggestion(client, args) {
        const sentId = args[0]
        const sentUrl = args[1]
        const sendingTime = args[2]
        while(Math.abs(sendingTime - Date.now())/(1000*60) < 1440) {
            await sleep(1000*60);
            if(!await clearCache(client, sentId, sentUrl, sendingTime)) return
            const suggestions = await client.channels.fetch(sugestieId);
            const s = await suggestions.messages.fetch(sentId);
            const results = await [
                s.reactions.cache.get('🟩').count,
                s.reactions.cache.get('🟥').count,
            ];
            if (Math.abs(parseInt(results[0], 10) - parseInt(results[1], 10)) >= 9) break
        }

        await endOfVoting(client, sentUrl, sentId, sendingTime)
        const fs = require('fs');
        fs.readFile('suggestionRecovery.txt', 'utf8', (err, data) => {
            if(data.length != 0) {
                data = data.replace(`${args.join(',')}\n`, '');
                fs.writeFile('suggestionRecovery.txt', data, 'utf8', (err) => {});
            }
        })
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function clearCache(client, sentId, url, sendingTime) {
    try {
        const suggestionsClear = await client.channels.fetch(sugestieId);
        const sClear = await suggestionsClear.messages.fetch(sentId);
        await suggestionsClear.messages.cache.delete(sClear.id);
    } catch {
        const fs = require('fs');
        const args = [sentId, url, sendingTime];
        fs.readFile('suggestionRecovery.txt', 'utf8', (err, data) => {
            if(data.length != 0) {
                data = data.replace(`${args.join(',')}\n`, '');
                fs.writeFile('suggestionRecovery.txt', data, 'utf8', (err) => {});
            }
        })
        return false
    }
    return true
}

async function endOfVoting(client, url, msgId, sendingTime) {
    await clearCache(client, msgId, url, sendingTime)
    try {
        const suggestions = await client.channels.fetch(sugestieId);
        const s = await suggestions.messages.fetch(msgId);
        const results = [
            s.reactions.cache.get('🟩').count-1,
            s.reactions.cache.get('🟥').count-1,
            s.reactions.cache.get('🟨').count-1,
        ];
        const votes = results.join('/') 
        var outcome;
        if (parseInt(results[0], 10) > parseInt(results[1], 10)) outcome = 'Tak';
        else outcome = 'Nie';
        const now = new Date()  
        const date = Math.round((now.getTime() + (now.getTimezoneOffset() * 60 * 1000)) / 1000)  
        const replay = `**__Koniec głosowania nad sugestią__**\n**Data:** <t:${date}>\n**Link do sugestii:** ${url.toString()}\n**Sprawca:** ${client.user}\n**Wynik:** ${votes.toString()}\n**Czy przeszła?:** ${outcome}`;
        const diary = await client.channels.fetch(dzienniczekId);
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
    } catch {
        const fs = require('fs');
        const args = [msgId, url, sendingTime];
        fs.readFile('suggestionRecovery.txt', 'utf8', (err, data) => {
            if(data.length != 0) {
                data = data.replace(`${args.join(',')}\n`, '');
                fs.writeFile('suggestionRecovery.txt', data, 'utf8', (err) => {});
            }
        })
    }
}