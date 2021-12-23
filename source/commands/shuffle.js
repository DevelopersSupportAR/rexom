const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const embed = require("../structures/embeds");

module.exports = {
    name: "shuffle",
    aliases: [],
    description: "Randomizes the queue",

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
                player.shuffle(message);
                embed.done(message, "**server queue has shuffled**")
            } else if (lang == "ar") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                player.shuffle(message);
                embed.done(message, "**تمت اعادة ترتيب قائمة التشغيل**")
            }
        } catch {
            console.log('rexom')
        }
    }
};