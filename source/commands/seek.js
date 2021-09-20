const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

module.exports = {
    name: "seek",
    aliases: [],
    description: "Skips to the specified timestamp in the track",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        let value = message.content.split(' ').slice(1).join(' ');
        if (lang == "en") {
            if (!value) return message.reply({
                content: emojis.error + ` | please Type The Skip Time Number`,
                ephemeral: true,
                allowedMentions: false
            });
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            player.seek(message, Number(value));
            let embed = new MessageEmbed()
                .setAuthor("✂️ | Seek")
                .setDescription(`**seeked to \`${value}\`**`)
                .setFooter(client.user.username)
                .setTimestamp()
            message.reply({ embeds: [embed] });
        } else if (lang == "ar") {
            if (!value) return message.reply({
                content: emojis.error + ` | يرجى كتابة الوقت المراد تخطيه بالثواني`,
                ephemeral: true,
                allowedMentions: false
            });
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            player.seek(message, Number(value));
            let embed = new MessageEmbed()
                .setAuthor("✂️ | Seek")
                .setDescription(`**seeked to \`${value}\`**`)
                .setFooter(client.user.username)
                .setTimestamp()
            message.reply({ embeds: [embed] });
        }
    }
};