const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { joinVoiceChannel } = require('@discordjs/voice');
const discordTTS = require('discord-tts');

module.exports = {
    name: "say",
    aliases: [],
    description: "Make The Bot Say Any Thing",

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
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            message.reply({ content: emojis.error + " | هذا الأمر م يعمل على هذا الأصدار من البوت" });
        } else if (lang == "ar") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            message.reply({ content: emojis.error + " | this command is will not run in this version" });
        }
    }
};