const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "loop",
    aliases: [],
    description: "Loop Queue/Song",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        var mode = message.content.split(' ').slice(1).join(' ') || "repeat song";
        if (lang == "ar") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            var modeler;
            if (mode == "off") modeler = 0;
            else if (mode == "repeat song") modeler = 1;
            else if (mode == "repeat queue") modeler = 2;
            else return message.reply({
                content: "you have to type the repeating mode type like <off/repeat song/repeat queue>",
                allowedMentions: false,
                ephemeral: true
            });
            player.setRepeatMode(message, parseInt(modeler));
            message.reply({
                content: `🔄 | تم تغير وضع التكرار الي: \`${mode}\``,
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "en") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            var modeler;
            if (mode == "off") modeler = 0;
            else if (mode == "repeat song") modeler = 1;
            else if (mode == "repeat queue") modeler = 2;
            else return message.reply({
                content: "you have to type the repeating mode type like <off/repeat song/repeat queue>",
                allowedMentions: false,
                ephemeral: true
            });
            player.setRepeatMode(message, parseInt(modeler));
            message.reply({
                content: `🔄 | repeating mode has changed to: \`${mode}\``,
                ephemeral: true,
                allowedMentions: false
            });
        }
    }
};