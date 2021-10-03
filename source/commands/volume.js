const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

module.exports = {
    name: "volume",
    aliases: [],
    description: "Controle Volume The Music",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        let value = args[1]
        if (lang == "en") {
            module.exports.guildID = message.guild.id;
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            player.setVolume(message, Number(value || 100))
            message.reply({ content: "🔊 | **Music Volume Has Changed To: **" + value || 100, allowedMentions: false, ephemeral: true })
        } else if (lang == "ar") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            player.setVolume(message, Number(value || 100))
            message.reply({ content: "🔊 | **تم تغير مستوى الصوت الى: **" + value || 100, allowedMentions: false, ephemeral: true })
        }
    }
};