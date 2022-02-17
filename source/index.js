require("dotenv").config();
const { Collection } = require("discord.js");
const client = require("./client/discord");
const player = require("./client/player");
const commands = new Collection();
const { login, register } = require("./structures/build");

(async function () {
  new login({ client: client });
  new register({
    dir: __dirname,
    commands: commands,
    player: player,
    client: client,
  });
  client.on("debug", (bug) => console.log(require("chalk").magenta(bug)));
  client.on("error", (err) => console.log(require("chalk").red(err)));
  client.on("warn", (warn) => console.log(require("chalk").yellow(warn)));
})();

module.exports = {
  commands: commands,
  client: client,
  player: player,
};