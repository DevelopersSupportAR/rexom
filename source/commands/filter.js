const { Client, Message, MessageEmbed } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

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
        let value = args[1];
        if (lang == "ar") {
            if (!value) return message.reply({
                content: emojis.error + ` | يجب تحديد فلتر`,
                ephemeral: true,
                allowedMentions: false
            });
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            if (['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax'].includes(value)) {
                player.setFilter(message, args[0]);
                message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setAuthor(`🎭 | Filters`, client.user.avatarURL({ dynamic: true }), `https://discord.gg/developer-support`)
                        .setColor('GREEN')
                        .setDescription(`🎭 | queue filter has been changed to \`${value}\``)
                        .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                    ],
                    ephemeral: true,
                    allowedMentions: false
                });
            } else message.reply({
                content: emojis.error + " | لا يمكنني العثور على هذا الأسم يمكنك الأختيار من هذه القائمه: ['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax']",
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "en") {
            if (!value) return message.reply({
                content: emojis.error + ` | You Music Specify A Filter`,
                ephemeral: true,
                allowedMentions: false
            });
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(message);
            if (!queue) return message.reply({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            if (['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax'].includes(value)) {
                player.setFilter(message, args[0]);
                message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setAuthor(`🎭 | Filters`, client.user.avatarURL({ dynamic: true }), `https://discord.gg/developer-support`)
                        .setColor('GREEN')
                        .setDescription(`🎭 | queue filter has been changed to \`${value}\``)
                        .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                    ],
                    ephemeral: true,
                    allowedMentions: false
                });
            } else message.reply({
                content: emojis.error + " | i can't find this filter name in my list, choose from thare: ['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax']",
                ephemeral: true,
                allowedMentions: false
            });
        }
    }
};