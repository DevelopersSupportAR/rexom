require('dotenv').config();
require('./server/server');
const { red, blue, green, gray } = require('chalk');
const { Client, Collection, Intents } = require('discord.js');
const commands = new Collection();
const SoundCloudPlugin = require('@distube/soundcloud');
const SpotifyPlugin = require('@distube/spotify');
const client = new Client({
    intents: 32767,
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true
    }
});
// intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
const DisTube = require('distube');
const player = new DisTube.default(client, {
    leaveOnEmpty: false,
    leaveOnStop: true,
    leaveOnFinish: false,
    searchSongs: 0,
    youtubeDL: true,
    updateYouTubeDL: true,
    plugins: [new SoundCloudPlugin.default(), new SpotifyPlugin.default()]
});

client.setMaxListeners(0)
process.setMaxListeners(0)
player.setMaxListeners(0)

client.slashCommands = new Collection();
client.commands = commands;

require('./models/events/loader').run(blue, red, client, __dirname);
require('./models/commands/loader').run(blue, red, commands, __dirname);
require('./models/slashCommands/loader').run(client);
require('./models/music/loader').run(blue, red, player, __dirname);

client.login(process.env.TOKEN).then(async function(token) {
    console.log(gray(require('figlet').textSync(require('./server/server'), { font: "Blocks" })));
    console.log(red.bold('Discord.JS Is Connect On: ') + green(token.split('.')[0] + '************************************'));
    console.log(blue.bold('https://discord.gg/developer-support') + red(' If You Need Support!!.'));
}).catch(async function(error) {
    console.log(red.bold(error));
});

module.exports.player = player;
