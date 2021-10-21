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
                    .setImage("https://camo.githubusercontent.com/0b6082ac62d1a2b9257aafe9e5e4e82e10efa73e07bb306a0717131e877be8bf/68747470733a2f2f6d656469612e646973636f72646170702e6e65742f6174746163686d656e74732f3834353130373434333537333731393131322f3835393232323532393933393231303235302f53637265656e73686f745f323032312d30362d32392d30322d30332d30322d36335f33613633373033376433356639356335646263646363373565363937636539312e6a7067")
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
    }
};