const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require('../structures/embeds');

module.exports = {
    name: "volume",
    aliases: [],
    description: "Controle Volume The Music",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            let value = args[1]
            if (lang == "en") {
                module.exports.guildID = message.guild.id;
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                player.setVolume(message, Number(value || 100))
                embed.done(message, "**Music Volume Has Changed To: **" + value || 100);
            } else if (lang == "ar") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                player.setVolume(message, Number(value || 100))
                embed.done(message, "**تم تغير مستوى الصوت الى: **" + value || 100);
            }
        } catch {
            console.log('rexom')
        }
    }
};