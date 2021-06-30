require("./server/express");
const { Client, Collection } = require("discord.js");
const client = new Client();
const chalk = require("chalk");
const fs = require("fs");
const DisTube = require('distube');
require('discord-buttons')(client);

client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true });
client.queue = new Map();
client.commands = new Collection();

fs.readdir(__dirname + "/bot/events/api/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(__dirname + "/bot/events/api/" + file);
        let eventName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading api event ") + chalk.magenta.bold(`"${eventName}"`)
        );
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir(__dirname + "/bot/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(__dirname + "/bot/commands/" + file);
        let commandName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading command ") + chalk.red.bold(`"${commandName}"`)
        );
        client.commands.set(commandName, props);
    });
});

fs.readdir(__dirname + "/bot/events/music/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let event = require(__dirname + "/bot/events/music/" + file);
        let eventName = file.split(".")[0];
        console.log(
            chalk.blue.bold("Loading distube event ") + chalk.magenta.bold(`"${eventName}"`)
        );
        client.distube.on(eventName, event.bind(null, (client)));
    });
});

client.distube.on("playSong", (message, queue, song) => message.channel.send(
    `Playing \`${song.name}\` - \`${song.formattedDuration}`
))

client.login(require("./config/bot").token).catch(err => console.log(chalk.red.bold(err)))
