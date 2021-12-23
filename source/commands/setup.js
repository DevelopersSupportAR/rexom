const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js");
const { Song } = require('disrexom')
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require("../structures/embeds");

module.exports = {
    name: "setup",
    aliases: [],
    description: "Setup A Music Collector Channel",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            if (!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return message.react(emojis.error);
            message.guild.channels.create('rexom-🎶', {
                type: "GUILD_TEXT",
                topic: "Play your favorite playlist with ReXom :notes:"
            }).then(async channel => {
                embed.done(message, "**reXom Channel Has Setup Here**: <#" + channel.id + ">");
                channel.send({
                    embeds: [
                        new MessageEmbed()
                        .setAuthor("No song playing currently")
                        .setImage("https://media.discordapp.net/attachments/743880363331420241/902711609112264804/unknown.png")
                    ],
                }).then(async msg => {
                    msg.react('⏹️')
                    msg.react('⏭️')
                    msg.react('⏯️')
                    msg.react('🔄')
                    msg.react('🔀')
                    msg.react('🔉')
                    msg.react('🔊')
                    db.set(`SeTupInFo_${message.guild.id}`, {
                        channelID: channel.id,
                        msgID: msg.id
                    });
                });
            });
        } catch {
            console.log('rexom')
        }
    }
};