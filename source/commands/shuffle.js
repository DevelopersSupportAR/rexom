const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

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
        if (lang == "en") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            player.shuffle(message);
            let embed = new MessageEmbed()
                .setAuthor("🔀 | Shuffle")
                .setDescription(`**server queue has shuffled**`)
                .setFooter(client.user.username)
                .setTimestamp()
            message.reply({ embeds: [embed] });
        } else if (lang == "ar") {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            player.shuffle(message);
            let embed = new MessageEmbed()
                .setAuthor("🔀 | Shuffle")
                .setDescription(`**server queue has shuffled**`)
                .setFooter(client.user.username)
                .setTimestamp()
            message.reply({ embeds: [embed] });
        }
    }
};