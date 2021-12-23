const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "info",
    description: "See Bot Info",
    type: 'CHAT_INPUT',

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        try {
            let settings = db.fetch(`Settings_${interaction.guild.id}`);
            const { version: djsversion } = require("discord.js");
            const { version } = require("../../package.json");
            const { utc } = require("moment");
            const os = require("os");
            const ms = require("ms");
            const core = os.cpus()[0];
            var usedMemory = os.totalmem() - os.freemem(),
                totalMemory = os.totalmem();
            var getpercentage = ((usedMemory / totalMemory) * 100).toFixed(2) + "%";
            const ar_g = new MessageEmbed()
                .setAuthor(client.ws.ping.toFixed(1), client.user.avatarURL(), 'https://discord.gg/developer-support')
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(0x2f3136)
                .addField("General :-",
                    `**❯ Client:** ${client.user.tag} (${client.user.id})\n` +
                    `**❯ Commands:** ${client.eventNames.name}\n` +
                    `**❯ Servers:** ${client.guilds.cache.size.toLocaleString()} \n` +
                    `**❯ Users:** ${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()} \n` +
                    `**❯ Channels:** ${client.channels.cache.size.toLocaleString()} \n` +
                    `**❯ Creation Date:** ${utc(client.user.createdTimestamp).format(
          "Do MMMM YYYY HH:mm:ss"
        )} \n` +
                    `**❯ Node.js:** ${process.version} \n` +
                    `**❯ Version:** v${version} \n` +
                    `**❯ Discord.js:** v${djsversion} \n` +
                    "\u200b"
                )
                .addField("System :-",
                    `**❯ Platform:** ${process.platform} \n` +
                    `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })} \n` +
                    `**❯ CPU:** \n` +
                    `\u3000 Cores: ${os.cpus().length} \n` +
                    `\u3000 Model: ${core.model} \n` +
                    `\u3000 Speed: ${core.speed}MHz \n` +
                    `**❯ Memory: ${getpercentage}** \n` +
                    `\u3000 Total: ${(
          process.memoryUsage().heapTotal /
          1024 /
          1024
        ).toFixed(2)} MB \n` +
                    `\u3000 Used: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
          2
        )} MB`
                )
                .setTimestamp();
            interaction.followUp({
                embeds: [ar_g],
                ephemeral: true
            });
        } catch {
            console.log('rexom')
        }
    },
};