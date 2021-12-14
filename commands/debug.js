exports.run = (client, msg, args) => {
  const config = require('../config.json');
  const db = require('../db.js');
  if (
    (msg.member.user.username === 'InfoX' &&
      msg.member.user.discriminator === '1337') ||
    (msg.member.user.username === 'olix3001' &&
      msg.member.user.discriminator === '0075')
  ) {
    msg.reply('Welcome to the debug module!');
    msg.reply(`args: ${args} channelinfo: ${msg.channel}`);
    console.log(args);
    msg.reply(`msg.member.user = ${msg.member.user}`);
  }
};
