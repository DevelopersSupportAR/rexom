const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require("../structures/embeds");

module.exports = {
    name: "skip",
    aliases: [],
    description: "Skip The Music",

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
                if (queue.songs.map((song, i) => i).length == 1) return embed.err(message, "**Thare Are No Song To Skip**");
                else {
                    player.skip(message);
                    embed.done(message, "**Music Has Skiped**")
                }
            } else if (lang == "ar") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                if (queue.songs.map((song, i) => i).length == 1) return embed.err(message, "**مفيش حاجه اسكب ليه هل ات عبيت**");
                else {
                    player.skip(message)
                    embed.done(message, "**تم تخطي الغنيه**")
                }
            }
        } catch {
            console.log('rexom')
        }
    }
};