const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require("../structures/embeds");

module.exports = {
    name: "seek",
    aliases: [],
    description: "Skips to the specified timestamp in the track",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            let value = message.content.split(' ').slice(1).join(' ');
            if (lang == "en") {
                if (!value) return embed.warn(message, "**please Type The Skip Time Number**")
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                player.seek(message, Number(value));
                embed.done(message, `**seeked to** \`${value}\``)
            } else if (lang == "ar") {
                if (!value) return embed.warn(message, "**يرجى كتابة الوقت المراد تخطيه بالثواني**")
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                player.seek(message, Number(value));
                embed.done(message, `**تم الأقتصاص الى:** \`${value}\``)
            }
        } catch {
            console.log('rexom')
        }
    }
};