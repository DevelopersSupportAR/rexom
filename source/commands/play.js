const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "play",
    aliases: [],
    description: "Play a music/playlist",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        module.exports.guildLANG = lang;
        module.exports.messageGET = message;
        let value = message.content.split(' ').slice(1).join(' ');
        if (lang == "en") {
            if (!value) return message.reply({
                content: emojis.error + ` | please type the song name/url`,
                ephemeral: true,
                allowedMentions: false
            });
            module.exports.guildID = message.guild.id;
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            player.play(message, value);
            message.reply({ content: `**🔍 | Searching To:** \`${value}\``, allowedMentions: false, ephemeral: true })
        } else if (lang == "ar") {
            if (!value) return message.reply({
                content: emojis.error + ` | يرجى كتابة اسم/رابط الأغنيه`,
                ephemeral: true,
                allowedMentions: false
            });
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            player.play(message, value);
            message.reply({ content: `**🔍 | جار البحث عن:** \`${value}\``, allowedMentions: false, ephemeral: true })
        }
    }
};