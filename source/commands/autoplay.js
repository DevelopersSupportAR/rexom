const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require('../structures/embeds');

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    description: "AutoPlay Music",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            if (lang == "en") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                let mode = player.toggleAutoplay(message);
                embed.done(message, `**Autoplay toggle has changed to: \`${mode ? "On" : "Off"}\` **`);
            } else if (lang == "ar") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                let mode = player.toggleAutoplay(message);
                embed.done(message, `** \`${mode ? "On" : "Off"}\` وضع التشغيل التلقئاء تحول لـ**`);
            }
        } catch {
            console.log('rexom')
        }
    }
};