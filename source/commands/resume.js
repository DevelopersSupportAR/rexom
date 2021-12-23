const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require("../structures/embeds");

module.exports = {
    name: "resume",
    aliases: [],
    description: "Resume The Music",

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
                if (queue.paused == false) return embed.err(message, "**The Music Is Not Paused**")
                player.resume(message);
                embed.done(message, "**Music Has Resumed!**")
            } else if (lang == "ar") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                if (queue.paused == false) return embed.err(message, "**لم يتم ايقاف الموسيى اصلا انت بتعمل ايه**");
                player.resume(message)
                embed.done(message, "*تم أستكمال الموسيقى**");
            }
        } catch {
            console.log('rexom')
        }
    }
};