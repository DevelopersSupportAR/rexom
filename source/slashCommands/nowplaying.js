const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const progressbar = require("string-progressbar")

module.exports = {
    name: "nowplaying",
    description: "What is paying",
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
        if (lang == "en") {
            module.exports.guildID = interaction.guild.id;
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            let track = queue.songs[0];
            if (track) {
                const time = track.duration * 1000;
                const currentTime = queue.currentTime;
                const result = new MessageEmbed()
                    .setColor('YELLOW')
                    .setAuthor(track.name, track.Thumbnail, track.url)
                    .setDescription(`${queue.paused == true ? ":pause_button:" : ":arrow_forward:"} | ${progressbar.splitBar(time === 0 ? currentTime : time, currentTime, 10)[0]} \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``)
                    .setThumbnail(track.Thumbnail)
                interaction.followUp({
                    embeds: [result],
                    ephemeral: false,
                    allowedMentions: false
                }).then(async function() {
                    setInterval(() => {
                        interaction.editReply({
                            embeds: [new MessageEmbed()
                                .setColor('YELLOW')
                                .setAuthor(track.name, track.Thumbnail, track.url)
                                .setDescription(`${queue.paused == true ? ":pause_button:" : ":arrow_forward:"} | ${progressbar.splitBar(time === 0 ? currentTime : time, currentTime, 10)[0]} \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``)
                                .setThumbnail(track.Thumbnail)
                            ],
                            ephemeral: false,
                            allowedMentions: false
                        })
                    }, 1000);
                })
            }
        } else if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            let track = queue.songs[0];
            if (track) {
                const time = track.duration * 1000;
                const currentTime = queue.currentTime;
                const result = new MessageEmbed()
                    .setColor('YELLOW')
                    .setAuthor(track.name, track.Thumbnail, track.url)
                    .setDescription(`${queue.paused == true ? ":pause_button:" : ":arrow_forward:"} | ${progressbar.splitBar(time === 0 ? currentTime : time, currentTime, 10)[0]} \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``)
                    .setThumbnail(track.Thumbnail)
                interaction.followUp({
                    embeds: [result],
                    ephemeral: true,
                    allowedMentions: false
                }).then(async function() {
                    setInterval(() => {
                        interaction.editfollowUp({
                            embeds: [new MessageEmbed()
                                .setColor('YELLOW')
                                .setAuthor(track.name, track.Thumbnail, track.url)
                                .setDescription(`${queue.paused == true ? ":pause_button:" : ":arrow_forward:"} | ${progressbar.splitBar(time === 0 ? currentTime : time, currentTime, 10)[0]} \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``)
                                .setThumbnail(track.Thumbnail)
                            ],
                            ephemeral: true,
                            allowedMentions: false
                        })
                    }, 1000);
                })
            }
        }
    },
};