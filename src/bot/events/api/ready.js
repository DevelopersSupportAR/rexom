const chalk = require('chalk');
const figlet = require("figlet");

module.exports = async function(client) {
    console.log(chalk.yellow.bold(figlet.textSync("Rexom")));
    await console.log(chalk.red.bold(client.user.tag) + chalk.blue.bold(" Is Ready"));

    await client.user.setActivity(require('../../../config/bot').prefix + "help");
    await client.user.setStatus("idle");

    setInterval(() => {
        client.guilds.cache.forEach(guild => {
            var channel = client.channels.cache.find(channel => channel.id == require('quick.db').fetch(`Voice_Channel_${guild.id}`));
            try {
                channel.join()
            } catch (err) {
                return;
            }
        });
    }, 1000 * 5);
}