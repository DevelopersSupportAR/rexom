require('dotenv').config();
const { Collection } = require('discord.js');
const client = require('./client/discord');
const player = require('./client/player');
const commands = new Collection();
const { login, register } = require('./structures/build');
new login({ client: client });
new register({ dir: __dirname, commands: commands, player: player, client: client });

module.exports = {
    commands: commands,
    client: client,
    player: player
};