const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const embed = require("../structures/embeds")
''

module.exports = {
    name: "filter",
    aliases: ["set-filter"],
    description: "songs filters",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            let value = args[1];
            if (lang == "ar") {
                if (!value) return embed.warn(message, "**يجب تحديد فلتر**");
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                if (['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax'].includes(value)) {
                    player.setFilter(message, args[0]);
                    embed.done(message, `**تم تغير فلتر الصوت الخاص بطابور العرض الى \`${value}\`**`)
                } else embed.err(message, "**لا يمكنني العثور على هذا الأسم يمكنك الأختيار من هذه القائمه: ['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax']**")
            } else if (lang == "en") {
                if (!value) return embed.warn(messgae, "**You Music Specify A Filter**")
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) return embed.notInVoice(message, lang);
                const queue = player.getQueue(message);
                if (!queue) return embed.notQueue(message, lang);
                if (['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax'].includes(value)) {
                    player.setFilter(message, args[0]);
                    embed.done(message, "**queue filter has been changed to \`${value}\`**")
                } else embed.err(message, "**i can't find this filter name in my list, choose from thare: ['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax']**")
            }
        } catch {
            console.log('rexom')
        }
    }
};