
var client = null;

// TODO: Change these id's!

const adminRole = process.env.ADMIN_ROLE_ID;
const mutedRole = process.env.MUTE_ROLE_ID;

// [everyone, uczen]
//const rolesToChange = ['706063478292480021', '725627767378542604']
const rolesToChange = ['788337311292194836']

const permissionCache = {};

module.exports = async (c, msg, cmd, ...args) => {
    client = c;
    if (msg.member.roles.cache.has(adminRole)) {
        if (cmd == 'lockdown') {
            if (args.length == 0) {
                // lockdown entire server
            } else {
                for (let ci of args) {
                    lockdownChannel(ci);
                }
            }
        }
    }
}

async function lockdownChannel(id) {
    if (client != null) {
        let channel = await client.channels.fetch(id);
        if (channel == null) return;

        if (channel.type != 'GUILD_TEXT' && channel.type != 'GUILD_VOICE') return;

        // change permissions
        if (channel.type == 'GUILD_TEXT') {

            if (permissionCache[channel.id] == null) permissionCache[channel.id] = {};
            for (let rtc of rolesToChange) {
                permissionCache[channel.id] = permissionsToObject(channel.permissionOverwrites.cache.get(rtc));
                channel.permissionOverwrites.edit(rtc, {
                    SEND_MESSAGES: false
                });
            }
        }

        console.log(JSON.stringify(permissionCache));
    }
}

function permissionsToObject(p) {
    const o = {};
    for (let a of p.allow) {

    }
    for (let d of p.deny) {

    }
    return o;
}