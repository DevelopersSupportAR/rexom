const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require('../structures/embeds');

module.exports = {
    name: "leave",
    aliases: [],
    description: "leave the 24/7 channel",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        if (lang == "ar") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) return embed.notInVoice(message, lang);
            db.delete(`Voice_Channel_${message.guild.id}`);
            embed.done(message, `**تمت ازالة التثبيت من: <#${voiceChannel.id}>**`);
        } else if (lang == "en") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) return embed.notInVoice(message, lang);
            db.delete(`Voice_Channel_${message.guild.id}`);
            embed.done(message, `**Done Leaved <#${voiceChannel.id}>**`);
        }
    }
};