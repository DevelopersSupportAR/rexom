const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const colors = require('../../config/colors.json');
const { player } = require('../index');

module.exports = {
    name: "lyrics",
    aliases: [],
    description: "Song lyrics",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
        try {
            if (lang == "ar") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) {
                    message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: {
            repliedUser: false
        }, ephemeral: true })
                    return
                }
                const queue = player.getQueue(message);
                if (!queue) return message.reply({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: {
            repliedUser: false
        }, ephemeral: true })
                let name = queue.songs.map((song, id) => song.name).slice(0, 1).join("\n");
                let uploader = queue.songs.map((song, id) => song.uploader.name).slice(0, 1).join("\n");
                let thumbnail = queue.songs.map((song, id) => song.thumbnail).slice(0, 1).join("\n");
                let url = queue.songs.map((song, id) => song.url).slice(0, 1).join("\n");
                let lyrics = await require('lyrics-finder')(uploader, name) || "Not Found!";
                message.reply({
                    embeds: [new MessageEmbed()
                        .setAuthor(`📑 | Lyrics`, thumbnail, url)
                        .setColor(colors.done)
                        .setThumbnail(thumbnail)
                        .setDescription(lyrics)
                        .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                    ],
                    allowedMentions: {
            repliedUser: false
        },
                    ephemeral: true
                });
            } else if (lang == "en") {
                const voiceChannel = message.member.voice.channel;
                if (!voiceChannel) {
                    message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: {
            repliedUser: false
        }, ephemeral: true })
                    return
                }
                const queue = player.getQueue(message);
                if (!queue) return message.reply({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: {
            repliedUser: false
        }, ephemeral: true })
                let name = queue.songs.map((song, id) => song.name).slice(0, 1).join("\n");
                let uploader = queue.songs.map((song, id) => song.uploader.name).slice(0, 1).join("\n");
                let thumbnail = queue.songs.map((song, id) => song.thumbnail).slice(0, 1).join("\n");
                let url = queue.songs.map((song, id) => song.url).slice(0, 1).join("\n");
                let lyrics = await require('lyrics-finder')(uploader, name) || "Not Found!";
                message.reply({
                    embeds: [new MessageEmbed()
                        .setAuthor(`📑 | Lyrics`, thumbnail, url)
                        .setColor(colors.done)
                        .setThumbnail(thumbnail)
                        .setDescription(lyrics)
                        .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                    ],
                    allowedMentions: {
            repliedUser: false
        },
                    ephemeral: true
                });
            }
        } catch {
            console.log('rexom')
        }
    }
};