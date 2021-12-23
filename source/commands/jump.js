const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require('../structures/embeds');

module.exports = {
    name: "jump",
    aliases: [],
    description: "skip a specific song",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            let value = args[1]
            if (lang == "ar") {
                if (!value) return embed.warn(message, "**يجب تحديد رقم الأغنيه في طابور العرض**")
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang)
                const queue = player.getQueue(message);
                if (!queue) return embed.notInVoice(message, lang)
                try {
                    player.jump(message, parseInt(value))
                } catch (err) {
                    embed.err(message, "**لا يمكن العثور على رقم الأغنيه في طابور عرض الموسيقى**")
                    throw err;
                }
                embed.done(message, `**تم القفظ الى الأغنيه صاحبة الرقم: \`${parseInt(value)}\`**`)
            } else if (lang == "en") {
                if (!value) return embed.warn(message, "**You Music Specify The Song Number On Server Queue**");
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang)
                const queue = player.getQueue(message);
                if (!queue) return embed.notInVoice(message, lang)
                try {
                    player.jump(message, parseInt(value))
                } catch (err) {
                    embed.err(message, "**the bot can't find this song number on the server queue**")
                    throw err;
                }
                embed.done(message, `**done jumped to song number \`${parseInt(value)}\`**`)
            }
        } catch {
            console.log('rexom')
        }
    }
};