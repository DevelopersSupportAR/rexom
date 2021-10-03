const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { player } = require('../index');
const emojis = require('../../config/emojis.json');
const db = require('quick.db');

module.exports = {
    name: "search",
    aliases: [],
    description: "Make The Bot Say Any Thing",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */

    run: async(client, message, args, prefix, lang) => {
      module.exports.messageGET = message;
        let value = message.content.split(' ').slice(1).join(' ');
        if (lang == "en") {
            if (!value) return message.reply({
                content: emojis.error + ` | please type the song name/url`,
                ephemeral: true,
                allowedMentions: false
            });
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            player.search(value, {
                limit: 20,
                type: 'video',
                safeSearch: false
            }).then(async results => {
                message.reply({
                    embeds: [new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(results.map((song, i) => `**${i + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n"))
                    ],
                    ephemeral: false,
                    allowedMentions: false
                });
                let filter = m => m.author.id == message.author.id;
                let collector = await message.channel.createMessageCollector({ filter, time: 0 });
                collector.on("collect", async(collected) => {
                    if (!isNaN(collected.content)) player.play(message, results.map((song, i) => song.url).slice(Number(collected.content) - 1, Number(collected.content))[0]) && collected.delete() && message.editReply({
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
                        let filter2 = (reaction, user) => user.id == message.author.id;
                        let emcoll = await msg.createReactionCollector({ filter2, time: 0 });
                        emcoll.on("collect", async(reaction, user) => {
                            if (user.partial) await user.fetch();
                            if (reaction.partial) await reaction.fetch();
                            if (reaction.message.partial) await reaction.message.fetch();
                            if (user.bot) return;
                            let queue = player.getQueue(message);
                            if (reaction.emoji.name == "⏯️") {
                                reaction.users.remove(user.id)
                                if (queue) {
                                    if (queue.paused == true) player.resume(message)
                                    else player.pause(message)
                                }
                            } else if (reaction.emoji.name == "⏹️") {
                                message.editReply({
                                    content: emojis.error + " | This Trak Has Closed!.",
                                    embeds: [],
                                    ephemeral: true,
                                    allowedMentions: false
                                });
                                reaction.users.remove(user.id)
                                player.stop(message)
                            } else if (reaction.emoji.name == "🔄") {
                                reaction.users.remove(user.id)
                                if (queue) {
                                    if (queue.repeatMode == 0) player.setRepeatMode(message, parseInt(1))
                                    if (queue.repeatMode == 1) player.setRepeatMode(message, parseInt(0))
                                }
                            }
                        });
                    });
                });
            });
        } else if (lang == "ar") {
            if (!value) return message.reply({
                content: emojis.error + ` | يرجى كتابة اسم/رابط الأغنيه`,
                ephemeral: true,
                allowedMentions: false
            });
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            player.search(value, {
                limit: 20,
                type: 'video',
                safeSearch: false
            }).then(async results => {
                let msg1 = await message.reply({
                    embeds: [new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(results.map((song, i) => `**${i + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n"))
                    ],
                    ephemeral: false,
                    allowedMentions: false
                });
                let filter = m => m.author.id == message.author.id;
                let collector = await message.channel.createMessageCollector({ filter, time: 0 });
                collector.on("collect", async(collected) => {
                    if (!isNaN(collected.content)) player.play(message, results.map((song, i) => song.url).slice(Number(collected.content) - 1, Number(collected.content))[0]) && collected.delete() && msg1.edit({
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
                        let filter2 = (reaction, user) => user.id == message.author.id;
                        let emcoll = await msg.createReactionCollector({ filter2, time: 0 });
                        emcoll.on("collect", async(reaction, user) => {
                            if (user.partial) await user.fetch();
                            if (reaction.partial) await reaction.fetch();
                            if (reaction.message.partial) await reaction.message.fetch();
                            if (user.bot) return;
                            let queue = player.getQueue(message);
                            if (reaction.emoji.name == "⏯️") {
                                reaction.users.remove(user.id)
                                if (queue) {
                                    if (queue.paused == true) player.resume(message)
                                    else player.pause(message)
                                }
                            } else if (reaction.emoji.name == "⏹️") {
                                msg1.edit({
                                    content: emojis.error + " | هذا الترك مغلق!.",
                                    embeds: [],
                                    ephemeral: true,
                                    allowedMentions: false
                                })
                                reaction.users.remove(user.id)
                                player.stop(message)
                            } else if (reaction.emoji.name == "🔄") {
                                reaction.users.remove(user.id)
                                if (queue) {
                                    if (queue.repeatMode == 0) player.setRepeatMode(message, parseInt(1))
                                    if (queue.repeatMode == 1) player.setRepeatMode(message, parseInt(0))
                                }
                            }
                        });
                    });
                });
            });
        }
    }
};

