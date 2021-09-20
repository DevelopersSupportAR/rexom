const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "pause",
    aliases: [],
    description: "Pause The Music",

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
            if (queue.paused == true) return message.reply({ content: ":x: | **This Music Is All Ready Paused**", ephemeral: true });
            player.pause(message);
            message.reply({ content: `*⏸ | **Music Has Paused**`, allowedMentions: false, ephemeral: true })
        } else if (lang == "ar") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            if (queue.paused == true) return message.reply({ content: ":x: | **والله الموسيقى وقفه متبقاش بضان و دوس تاني**", ephemeral: true });
            player.pause(message)
            message.reply({ content: `⏸ | **تم أيقاف الموسقى**`, allowedMentions: false, ephemeral: true })
        }
    }
};