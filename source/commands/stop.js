const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require("../structures/embeds");

module.exports = {
    name: "stop",
    aliases: [],
    description: "Stop The Music",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            if (lang == "en") {
                module.exports.guildID = message.guild.id;
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                player.stop(message);
                embed.done(message, "**The Music Has Stoped**");
            } else if (lang == "ar") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                player.stop(message);
                embed.done(message, "**تم ايقاف الموسقى**");
            }
        } catch {
            console.log('rexom')
        }
    }
};