const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "lyrics",
    description: "Song lyrics",
    type: 'CHAT_INPUT',

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        let settings = db.fetch(`Settings_${interaction.guild.id}`);
        let lang = settings.lang;
        if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            let name = queue.songs.map((song, id) => song.name).slice(0, 1).join("\n");
            let uploader = queue.songs.map((song, id) => song.uploader.name).slice(0, 1).join("\n");
            let thumbnail = queue.songs.map((song, id) => song.thumbnail).slice(0, 1).join("\n");
            let url = queue.songs.map((song, id) => song.url).slice(0, 1).join("\n");
            let lyrics = await require('lyrics-finder')(uploader, name) || "Not Found!";
            interaction.followUp({
                embeds: [new MessageEmbed()
                    .setAuthor(`📑 | Lyrics`, thumbnail, url)
                    .setColor('GREEN')
                    .setThumbnail(thumbnail)
                    .setDescription(lyrics)
                    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                ],
                allowedMentions: false,
                ephemeral: true
            });
        } else if (lang == "en") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            let name = queue.songs.map((song, id) => song.name).slice(0, 1).join("\n");
            let uploader = queue.songs.map((song, id) => song.uploader.name).slice(0, 1).join("\n");
            let thumbnail = queue.songs.map((song, id) => song.thumbnail).slice(0, 1).join("\n");
            let url = queue.songs.map((song, id) => song.url).slice(0, 1).join("\n");
            let lyrics = await require('lyrics-finder')(uploader, name) || "Not Found!";
            interaction.followUp({
                embeds: [new MessageEmbed()
                    .setAuthor(`📑 | Lyrics`, thumbnail, url)
                    .setColor('GREEN')
                    .setThumbnail(thumbnail)
                    .setDescription(lyrics)
                    .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                ],
                allowedMentions: false,
                ephemeral: true
            });
        }
    },
};