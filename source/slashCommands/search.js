const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

module.exports = {
    name: "search",
    description: "Search For Music",
    type: 'CHAT_INPUT',
    options: [{
        name: "value",
        description: "the word that the bot will search on it",
        type: "STRING",
        required: true
    }],
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
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            player.search(interaction.options.getString('value'), {
                limit: 20,
                type: 'video',
                safeSearch: false
            }).then(async results => {
                interaction.followUp({
                    embeds: [new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(results.map((song, i) => `**${i + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n"))
                    ],
                    ephemeral: false,
                    allowedMentions: false
                });
                let filter = m => m.author.id == interaction.user.id;
                let collector = await interaction.channel.createMessageCollector({ filter, time: 0 });
                collector.on("collect", async(collected) => {
                    if (!isNaN(collected.content)) player.play(interaction, results.map((song, i) => song.url).slice(Number(collected.content) - 1, Number(collected.content))[0]) && collected.delete() && interaction.editReply({
                        embeds: [new MessageEmbed()
                            .setColor("GREEN")
                            .setDescription(`🎶 | **__[${results.map((song, i) => song.name).slice(Number(collected.content) - 1, Number(collected.content))[0]}](${results.map((song, i) => song.url).slice(Number(collected.content) - 1, Number(collected.content))[0]})__ Is Playing**\n**📽️ | Music Made By: [${results.map((song, i) => song.uploader.name).slice(Number(collected.content) - 1, Number(collected.content))[0]}](${results.map((song, i) => song.uploader.url).slice(Number(collected.content) - 1, Number(collected.content))[0]})**`)
                        ],
                        ephemeral: false,
                        allowedMentions: false
                    }).then(async msg => {
                        msg.react('⏯️')
                        msg.react('⏹️')
                        msg.react('🔄')
                        let filter2 = (reaction, user) => user.id == interaction.user.id;
                        let emcoll = await msg.createReactionCollector({ filter2, time: 0 });
                        emcoll.on("collect", async(reaction, user) => {
                            if (user.partial) await user.fetch();
                            if (reaction.partial) await reaction.fetch();
                            if (reaction.message.partial) await reaction.message.fetch();
                            if (user.bot) return;
                            let queue = player.getQueue(interaction);
                            if (reaction.emoji.name == "⏯️") {
                                reaction.users.remove(user.id)
                                if (queue) {
                                    if (queue.paused == true) player.resume(interaction)
                                    else player.pause(interaction)
                                }
                            } else if (reaction.emoji.name == "⏹️") {
                                interaction.editReply({
                                    content: emojis.error + " | This Trak Has Closed!.",
                                    embeds: [],
                                    ephemeral: true,
                                    allowedMentions: false
                                });
                                reaction.users.remove(user.id)
                                player.stop(interaction)
                            } else if (reaction.emoji.name == "🔄") {
                                reaction.users.remove(user.id)
                                if (queue) {
                                    if (queue.repeatMode == 0) player.setRepeatMode(interaction, parseInt(1))
                                    if (queue.repeatMode == 1) player.setRepeatMode(interaction, parseInt(0))
                                }
                            }
                        });
                    });
                });
            });
        } else if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            player.search(interaction.options.getString('value'), {
                limit: 20,
                type: 'video',
                safeSearch: false
            }).then(async results => {
                interaction.followUp({
                    embeds: [new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(results.map((song, i) => `**${i + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n"))
                    ],
                    ephemeral: false,
                    allowedMentions: false
                });
                let filter = m => m.author.id == interaction.user.id;
                let collector = await interaction.channel.createMessageCollector({ filter, time: 0 });
                collector.on("collect", async(collected) => {
                    if (!isNaN(collected.content)) player.play(interaction, results.map((song, i) => song.url).slice(Number(collected.content) - 1, Number(collected.content))[0]) && collected.delete() && interaction.editReply({
                        embeds: [new MessageEmbed()
                            .setColor("GREEN")
                            .setDescription(`🎶 | **__[${results.map((song, i) => song.name).slice(Number(collected.content) - 1, Number(collected.content))[0]}](${results.map((song, i) => song.url).slice(Number(collected.content) - 1, Number(collected.content))[0]})__ تعمل**\n**📽️ | صانع الموسقى: [${results.map((song, i) => song.uploader.name).slice(Number(collected.content) - 1, Number(collected.content))[0]}](${results.map((song, i) => song.uploader.url).slice(Number(collected.content) - 1, Number(collected.content))[0]})**`)
                        ],
                        ephemeral: false,
                        allowedMentions: false
                    }).then(async msg => {
                        msg.react('⏯️')
                        msg.react('⏹️')
                        msg.react('🔄')
                        let filter2 = (reaction, user) => user.id == interaction.user.id;
                        let emcoll = await msg.createReactionCollector({ filter2, time: 0 });
                        emcoll.on("collect", async(reaction, user) => {
                            if (user.partial) await user.fetch();
                            if (reaction.partial) await reaction.fetch();
                            if (reaction.message.partial) await reaction.message.fetch();
                            if (user.bot) return;
                            let queue = player.getQueue(interaction);
                            if (reaction.emoji.name == "⏯️") {
                                reaction.users.remove(user.id)
                                if (queue) {
                                    if (queue.paused == true) player.resume(interaction)
                                    else player.pause(interaction)
                                }
                            } else if (reaction.emoji.name == "⏹️") {
                                interaction.editReply({
                                    content: emojis.error + " | هذا الترك مغلق!.",
                                    embeds: [],
                                    ephemeral: true,
                                    allowedMentions: false
                                })
                                reaction.users.remove(user.id)
                                player.stop(interaction)
                            } else if (reaction.emoji.name == "🔄") {
                                reaction.users.remove(user.id)
                                if (queue) {
                                    if (queue.repeatMode == 0) player.setRepeatMode(interaction, parseInt(1))
                                    if (queue.repeatMode == 1) player.setRepeatMode(interaction, parseInt(0))
                                }
                            }
                        });
                    });
                });
            });
        }
    },
};