require('dotenv').config();
const { red, blue, green, gray } = require('chalk');
const { Collection } = require('discord.js');
const client = require('./client/discord');
const player = require('./client/player');
const commands = new Collection();
const slashCommands = new Collection();


module.exports = {
    commands: commands,
    slashCommands: slashCommands,
    client: client,
    player: player
}

require('./server/server');
require('./models/events/loader').run(blue, red, client, __dirname);
require('./models/commands/loader').run(blue, red, commands, __dirname);
require('./models/slashCommands/loader').run(client);
require('./models/music/loader').run(blue, red, player, __dirname);

client.login(process.env.TOKEN).then(async function(token) {
    console.log(gray(require('figlet').textSync("NIRO", { font: "Blocks" })));
    console.log(red.bold('Discord.JS Is Connect On: ') + green(token.split('.')[0] + '************************************'));
    console.log(blue.bold('https://discord.gg/developer-support') + red(' If You Need Support!!.'));
}).catch(async function(error) {
    console.log(red.bold(error));
});