const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require('../structures/embeds');

module.exports = {
    name: "loop",
    aliases: [],
    description: "Loop Queue/Song",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            var mode = message.content.split(' ').slice(1).join(' ') || "repeat song";
            if (lang == "ar") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                var modeler;
                if (mode == "off") modeler = 0;
                else if (mode == "repeat song") modeler = 1;
                else if (mode == "repeat queue") modeler = 2;
                else return embed.err(message, "**you have to type the repeating mode type like <off/repeat song/repeat queue>**")
                player.setRepeatMode(message, parseInt(modeler));
                embed.done(message, `**تم تغير وضع التكرار الي: \`${mode}\`**`);
            } else if (lang == "en") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                var modeler;
                if (mode == "off") modeler = 0;
                else if (mode == "repeat song") modeler = 1;
                else if (mode == "repeat queue") modeler = 2;
                else return embed.err(message, "**you have to type the repeating mode type like <off/repeat song/repeat queue>**")
                player.setRepeatMode(message, parseInt(modeler));
                embed.done(message, `**repeating mode has changed to: \`${mode}\`**`)
            }
        } catch {
            console.log('rexom')
        }
    }
};