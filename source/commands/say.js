const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { joinVoiceChannel } = require('@discordjs/voice');
const discordTTS = require('discord-tts');
const embed = require("../structures/embeds");

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
            if (!voiceChannel) return embed.notInVoice(message, lang);
            embed.err(message, "**هذا الأمر م يعمل على هذا الأصدار من البوت**")
        } else if (lang == "ar") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) return embed.notInVoice(message, lang);
            embed.err(message, "**this command is will not run in this version**")
        }
    }
};