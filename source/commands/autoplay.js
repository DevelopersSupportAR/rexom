const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    description: "AutoPlay Music",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        if (lang == "en") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            let mode = player.toggleAutoplay(message);
            message.reply({
                content: emojis.done + ` | **Autoplay toggle has changed to: ` + (mode ? "On" : "Off") + "**",
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "ar") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            let mode = player.toggleAutoplay(message);
            message.reply({
                content: emojis.done + ` | وضع التشغيل التلقئاء تحول لـ**: ` + (mode ? "On" : "Off") + "**",
                ephemeral: true,
                allowedMentions: false
            });
        }
    }
};