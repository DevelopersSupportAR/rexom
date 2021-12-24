const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require('../structures/embeds');

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
        try {
            module.exports.guildLANG = lang;
            module.exports.messageGET = message;
            let value = message.content.split(' ').slice(1).join(' ');
            if (lang == "en") {
                if (!value) return embed.err(message, "**please type the song name/url**")
                module.exports.guildID = message.guild.id;
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                player.play(message, value);
                message.reply({ content: `**🔍 | Searching To:** \`${value}\``, allowedMentions: {
            repliedUser: false
        }, ephemeral: true })
            } else if (lang == "ar") {
                if (!value) return embed.err(message, "**يرجى كتابة اسم/رابط الأغنيه**")
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                player.play(message, value);
                message.reply({ content: `**🔍 | جار البحث عن:** \`${value}\``, allowedMentions: {
            repliedUser: false
        }, ephemeral: true }).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 2500);
                });
            }
        } catch {
            console.log('rexom')
        }
    }
};