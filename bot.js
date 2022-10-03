const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config()

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

bot.once('ready', () => {
	console.log('Ready!');
});

bot.login(process.env.TOKEN);


module.exports = bot;