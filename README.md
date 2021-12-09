# Discord bot for OOOZ server
This is a discord bot created for OOOZ server

# Setup
to setup this project you need to create `.env` file in main directory with `TOKEN=<your bot token>`

# Running on production
If you want to setup this bot on production we recommend using pm2 process manager. To do this use:
```
sudo npm i pm2 -g
pm2 start "npm start" --name OOOZet
```

Then you can type in `pm2 logs OOOZet` to see logs from the bot
or `pm2 kill` to stop the bot