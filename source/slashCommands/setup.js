const { Client, CommandInteraction, MessageEmbed, Message, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "setup",
    description: "Setup A Music Collector Channel",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * @param {Song} song
     */

    run: async(client, interaction, args) => {
        try {
            if (!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return interaction.react(emojis.error);
            interaction.guild.channels.create('rexom-🎶', {
                type: "GUILD_TEXT",
                topic: "Play your favorite playlist with ReXom :notes:"
            }).then(async channel => {
                embed.done(interaction, "**reXom Channel Has Setup Here**: <#" + channel.id + ">", "/");
                channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setAuthor("No song playing currently")
                        .setImage("https://d.top4top.io/p_2151263kx1.jpg")
                    ],
                }).then(async msg => {
                    msg.react('⏹️')
                    msg.react('⏭️')
                    msg.react('⏯️')
                    msg.react('🔄')
                    msg.react('🔀')
                    msg.react('🔉')
                    msg.react('🔊')
                    db.set(`SeTupInFo_${interaction.guild.id}`, {
                        channelID: channel.id,
                        msgID: msg.id
                    });
                });
            });
        } catch {
            console.log('rexom')
        }
    },
};
