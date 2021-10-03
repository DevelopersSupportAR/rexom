const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

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
        if (lang == "en") {
            module.exports.guildID = message.guild.id;
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            if (queue.songs.map((song, i) => i).length == 1) return message.reply({ content: ":x: | **Thare Are No Song To Skip**", ephemeral: true });
            else {
                player.skip(message);
                message.reply({ content: "⏭ | **Music Has Skiped**", allowedMentions: false, ephemeral: true })
            }
        } else if (lang == "ar") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            if (queue.songs.map((song, i) => i).length == 1) return message.reply({ content: ":x: | **مفيش حاجه اسكب ليه هل ات عبيت**", ephemeral: true });
            else {
                player.skip(message)
                message.reply({ content: "⏭ | **تم تخطي الغنيه**", allowedMentions: false, ephemeral: true })
            }
        }
    }
};