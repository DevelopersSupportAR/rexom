const { Client, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Song, Queue } = require('distube');
const { player } = require('../index');
const { panelType } = require('../../config/bot.json');
const db = require('quick.db');
let repeatModee;
let pausee;

/**
 * 
 * @param {Client} client 
 * @param {Song} song
 * @param {Queue} queue
 */

module.exports = async(client, queue, song) => {
    module.exports.song = song;
    let lang = require('../slashCommands/play').guildLANG || require('../commands/play').guildLANG;
    let interaction = require('../slashCommands/play').interactionGET || require('../commands/play').messageGET || require('../slashCommands/search').interactionGET || require('../commands/search').messageGET || require('../slashCommands/play-playlist').interactionGET || require('../commands/play-playlist').messageGET;
    let noMessage = require('../slashCommands/search').noMessage || require('../commands/search').noMessage;
    let getQueue;
    if (interaction) {
        try {
            getQueue = await player.getQueue(interaction);
        } catch (err) {
            console.log(' ')
        }
        setInterval(() => {
            try {
                let data = queue.repeatMode;
                if (data == 0) repeatModee = "Disabled";
                else if (data == 1) repeatModee = "Song";
                else if (data == 2) repeatModee = "Queue";
                else repeatModee = "Disabled";
                let data2 = queue.paused;
                if (data2 == true) pausee = "Paused";
                else if (data2 == false) pausee = "Running";
                else pausee = "Empty";
            } catch (err) {
                db.delete(`SongDashData_${interaction.guild.id}`)
            }
            if (queue.songs.map((song, id) => id + 1).length == 0) return db.delete(`SongDashData_${interaction.guild.id}`);
            db.set(`SongDashData_${interaction.guild.id}`, {
                repeat: repeatModee,
                pause: pausee,
                songs: queue.songs.map((song, id) => id + 1).length
            });
        }, 2500)
    }
    if (noMessage !== "off") {
        if (lang == "en") {
            let embed = new MessageEmbed()
                .setColor("GREEN")
                .setFooter(song.formattedDuration + ` | ${song.likes}👍 ${song.dislikes}👎`)
                .setThumbnail(song.thumbnail)
                .setDescription(`\`\`\`\n${song.name}\n\`\`\``)
                .addFields({
                    name: "**Duration**",
                    value: song.formattedDuration,
                    inline: true
                }, {
                    name: "**Requested by**",
                    value: song.formattedDuration,
                    inline: true
                }, {
                    name: "**Uploader**",
                    value: `**[${song.uploader.name}](${song.uploader.url})**`,
                    inline: true
                }, {
                    name: "**Song URL:**",
                    value: song.url,
                    inline: true
                });
            if (panelType == "buttons") {
                let btn1 = new MessageButton()
                    .setStyle("DANGER")
                    .setEmoji("🛑")
                    .setCustomId("stop");
                let btn2 = new MessageButton()
                    .setStyle("SUCCESS")
                    .setEmoji("🔄")
                    .setCustomId("loop");
                let btn3 = new MessageButton()
                    .setStyle("DANGER")
                    .setEmoji("📑")
                    .setCustomId("lyrics");
                let btn4 = new MessageButton()
                    .setStyle("SUCCESS")
                    .setEmoji("⏭")
                    .setCustomId("skip");
                let btn5 = new MessageButton()
                    .setStyle("SUCCESS")
                    .setEmoji("⏸")
                    .setCustomId("pause");
                let btn6 = new MessageButton()
                    .setStyle("SUCCESS")
                    .setEmoji("▶")
                    .setCustomId("resume");
                let row = new MessageActionRow()
                    .addComponents(btn1, btn2, btn3);
                let row2 = new MessageActionRow()
                    .addComponents(btn4, btn5, btn6);
                let msg = await queue.textChannel.send({ content: `**🔍 | Found:** \`${song.name}\`\n**Played By: \`${song.user.username}\`**`, embeds: [embed], components: [row, row2] });
                const filter = i => i.user.id == song.user.id;
                let collector = msg.createMessageComponentCollector(filter, { time: 0 });

                collector.on('collect', async i => {
                    if (user.id !== i.user.id) queue.textChannel.send({ content: emojis.error + ' | **only song player can use the panel**!' })
                    if (i.customId == "stop") {
                        try {
                            if (!getQueue) return;
                            let msgID = require('quick.db').fetch(`Delete_${interaction.channel.id}`);
                            msg.delete();
                            interaction.channel.messages.fetch(msgID).then(m => m.delete())
                            i.channel.send({ content: "🛑 | **Music Has Stoped**", ephemeral: true }).then(m => {
                                setTimeout(() => {
                                    m.delete()
                                }, 1500);
                            });
                            player.stop(interaction);
                        } catch {
                            console.log('')
                        }
                    } else if (i.customId == "loop") {
                        try {
                            if (!getQueue) return;
                            if (queue) {
                                player.setRepeatMode(interaction, parseInt(1));
                                i.channel.send({ content: "🔄 | **Music Is On Loop**", ephemeral: true }).then(m => {
                                    setTimeout(() => {
                                        m.delete()
                                    }, 1500);
                                });
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (i.customId == "lyrics") {
                        try {
                            if (!getQueue) return;
                            if (queue) {
                                let lyrics = await require('lyrics-finder')(song.name, song.name) || "Not Found!";
                                let lyr = new MessageEmbed()
                                    .setAuthor(`📑 | Lyrics`, song.thumbnail, song.url)
                                    .setColor('GREEN')
                                    .setThumbnail(song.thumbnail)
                                    .setDescription(lyrics)
                                    .setFooter("Bot Made By: NIRO")
                                i.channel.send({ content: "📑 | **Music Lyrics: **", embeds: [lyr], ephemeral: true }).then(m => {
                                    setTimeout(() => {
                                        m.delete()
                                    }, 7500);
                                });
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (i.customId == "skip") {
                        try {
                            if (!getQueue) return;
                            if (queue) {
                                if (queue.songs.map((song, i) => i).length == 1) return i.channel.send({ content: ":x: | **Thare Are No Song To Skip**", ephemeral: true });
                                else {
                                    player.skip(interaction);
                                    i.channel.send({ content: "⏭ | **Music Has Skiped**", ephemeral: true }).then(m => {
                                        setTimeout(() => {
                                            m.delete()
                                        }, 1500);
                                    });
                                }
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (i.customId == "pause") {
                        try {
                            if (!getQueue) return;
                            if (queue) {
                                if (queue.paused == true) return i.channel.send({ content: ":x: | **This Music Is All Ready Paused**", ephemeral: true });
                                player.pause(interaction);
                                i.channel.send({ content: "⏸ | **Music Has Paused**", ephemeral: true }).then(m => {
                                    setTimeout(() => {
                                        m.delete()
                                    }, 1500);
                                });
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (i.customId == "resume") {
                        try {
                            if (!getQueue) return;
                            if (queue) {
                                if (queue.paused == false) return i.channel.send({ content: ":x: | **The Music Is Not Paused**", ephemeral: true });
                                player.resume(interaction);
                                i.channel.send({ content: "▶ | **Music Has Resumed**", ephemeral: true }).then(m => {
                                    setTimeout(() => {
                                        m.delete()
                                    }, 1500);
                                });
                            }
                        } catch {
                            console.log('')
                        }
                    }
                });
            } else if (panelType == "reactions") {
                let msg = await queue.textChannel.send({ content: `**🔍 | Found:** \`${song.name}\`\n**Played By: \`${song.user.username}\`**`, embeds: [embed] })
                msg.react('⏹️')
                msg.react('⏭️')
                msg.react('⏯️')
                msg.react('🔄')
                msg.react('🔀')
                msg.react('🔉')
                msg.react('🔊')
                const filter = (reaction, user) => user.id == song.user.id;
                let collector = await msg.createReactionCollector({
                    filter: filter,
                    time: 0
                });
                collector.on("collect", async(reaction, user) => {
                    if (user.partial) await user.fetch();
                    if (reaction.partial) await reaction.fetch();
                    if (reaction.message.partial) await reaction.message.fetch();
                    if (user.bot) return;
                    reaction.users.remove(user.id);
                    if (user.id !== song.user.id) return;
                    let queue = player.getQueue(interaction);
                    if (reaction.emoji.name == "⏯️") {
                        try {
                            reaction.users.remove(user.id)
                            if (queue) {
                                if (queue.paused == true) player.resume(interaction)
                                else player.pause(interaction)
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "⏹️") {
                        try {
                            reaction.users.remove(user.id)
                            player.stop(interaction)
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "⏭️") {
                        try {
                            if (queue) {
                                reaction.users.remove(user.id)
                                if (queue.songs.map((song, i) => i).length == 1) return;
                                player.skip(interaction)
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "🔄") {
                        try {
                            reaction.users.remove(user.id)
                            if (queue) {
                                if (queue.repeatMode == 0) player.setRepeatMode(interaction, parseInt(1))
                                if (queue.repeatMode == 1) player.setRepeatMode(interaction, parseInt(0))
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "🔀") {
                        try {
                            reaction.users.remove(user.id)
                            if (queue) {
                                player.shuffle(interaction)
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "🔉") {
                        try {
                            reaction.users.remove(user.id)
                            if (queue) {
                                let vol = queue.volume;
                                player.setVolume(interaction, Number(vol) - 10)
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "🔊") {
                        try {
                            reaction.users.remove(user.id)
                            if (queue) {
                                let vol = queue.volume;
                                player.setVolume(interaction, Number(vol) + 10)
                            }
                        } catch {
                            console.log('')
                        }
                    }
                });
            } else if (panelType == "none") {
                queue.textChannel.send({ content: `**🔍 | Found:** \`${song.name}\`\n**Played By: \`${song.user.username}\`**`, embeds: [embed] });
            }
        } else if (lang == "ar") {
            let embed = new MessageEmbed()
                .setColor("GREEN")
                .setFooter(song.formattedDuration + ` | ${song.likes}👍 ${song.dislikes}👎`)
                .setThumbnail(song.thumbnail)
                .setDescription(`\`\`\`\n${song.name}\n\`\`\``)
                .addFields({
                    name: "**الوقت**",
                    value: song.formattedDuration,
                    inline: true
                }, {
                    name: "**مطلوبه بواسطة**",
                    value: song.formattedDuration,
                    inline: true
                }, {
                    name: "**مرفوعه بواسطة**",
                    value: `**[${song.uploader.name}](${song.uploader.url})**`,
                    inline: true
                }, {
                    name: "**مصدر الأغنيه**",
                    value: song.url,
                    inline: true
                });
            if (panelType == "buttons") {
                let btn1 = new MessageButton()
                    .setStyle("DANGER")
                    .setEmoji("🛑")
                    .setCustomId("stop");
                let btn2 = new MessageButton()
                    .setStyle("SUCCESS")
                    .setEmoji("🔄")
                    .setCustomId("loop");
                let btn3 = new MessageButton()
                    .setStyle("DANGER")
                    .setEmoji("📑")
                    .setCustomId("lyrics");
                let btn4 = new MessageButton()
                    .setStyle("SUCCESS")
                    .setEmoji("⏭")
                    .setCustomId("skip");
                let btn5 = new MessageButton()
                    .setStyle("SUCCESS")
                    .setEmoji("⏸")
                    .setCustomId("pause");
                let btn6 = new MessageButton()
                    .setStyle("SUCCESS")
                    .setEmoji("▶")
                    .setCustomId("resume");
                let row = new MessageActionRow()
                    .addComponents(btn1, btn2, btn3);
                let row2 = new MessageActionRow()
                    .addComponents(btn4, btn5, btn6);
                let msg = await queue.textChannel.send({ content: `**🔍 | :تم العثور على** \`${song.name}\`\n**تم التشغيل عن طريق: \`${song.user.username}\`**`, embeds: [embed], components: [row, row2] })
                const filter = i => i.user.id == song.user.id;
                let collector = msg.createMessageComponentCollector(filter, { time: 0 });

                collector.on('collect', async i => {
                    // i.deferReply();
                    if (user.id !== i.user.id) i.channel.send({ content: emojis.error + ' | **only song player can use the panel**!' })
                    if (i.customId == "stop") {
                        try {
                            if (!getQueue) return;
                            if (queue) {
                                let msgID = require('quick.db').fetch(`Delete_${interaction.channel.id}`);
                                msg.delete();
                                interaction.channel.messages.fetch(msgID).then(m => m.delete())
                                player.stop(interaction);
                                i.channel.send({ content: "🛑 | **تم أياف الموسيقى**", ephemeral: true }).then(m => {
                                    setTimeout(() => {
                                        m.delete()
                                    }, 1500);
                                });
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (i.customId == "loop") {
                        try {
                            if (!getQueue) return;
                            if (queue) {
                                player.setRepeatMode(interaction, parseInt(1));
                                i.channel.send({ content: "🔄 | **تم تقعيل وضع التكرار**", ephemeral: true }).then(m => {
                                    setTimeout(() => {
                                        m.delete()
                                    }, 1500);
                                });
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (i.customId == "lyrics") {
                        try {
                            if (!getQueue) return;
                            if (queue) {
                                let lyrics = await require('lyrics-finder')(song.name, song.name) || "Not Found!";
                                let lyr = new MessageEmbed()
                                    .setAuthor(`📑 | Lyrics`, song.thumbnail, song.url)
                                    .setColor('GREEN')
                                    .setThumbnail(song.thumbnail)
                                    .setDescription(lyrics)
                                    .setFooter("Bot Made By: NIRO")
                                i.channel.send({ content: "📑 | ** كلمات الأغنية: **", embeds: [lyr], ephemeral: true }).then(m => {
                                    setTimeout(() => {
                                        m.delete()
                                    }, 7500);
                                });
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (i.customId == "skip") {
                        try {
                            if (!getQueue) return;
                            if (queue) {
                                if (queue.songs.map((song, i) => i).length == 1) return i.channel.send({ content: ":x: | **مفيش حاجه اسكب ليه هل ات عبيت**", ephemeral: true });
                                else {
                                    player.skip(interaction);
                                    i.channel.send({ content: "⏭ | **تم تخطي الغنيه**", ephemeral: true }).then(m => {
                                        setTimeout(() => {
                                            m.delete()
                                        }, 1500);
                                    });
                                }
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (i.customId == "pause") {
                        try {
                            if (!getQueue) return;
                            if (queue) {
                                if (queue.paused == true) return i.channel.send({ content: ":x: | **والله الموسيقى وقفه متبقاش بضان و دوس تاني**", ephemeral: true });
                                player.pause(interaction);
                                i.channel.send({ content: "⏸ | **تم أيقاف الموسقى**", ephemeral: true }).then(m => {
                                    setTimeout(() => {
                                        m.delete()
                                    }, 1500);
                                });
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (i.customId == "resume") {
                        try {
                            if (!getQueue) return;
                            if (queue) {
                                if (queue.paused == false) return i.channel.send({ content: ":x: | **لم يتم ايقاف الموسيى اصلا انت بتعمل ايه**", ephemeral: true });
                                player.resume(interaction);
                                i.channel.send({ content: "▶ | **تم أستكمال الموسيقى**", ephemeral: true }).then(m => {
                                    setTimeout(() => {
                                        m.delete()
                                    }, 1500);
                                });
                            }
                        } catch {
                            console.log('')
                        }
                    }
                });
            } else if (panelType == "reactions") {
                let msg = await queue.textChannel.send({ content: `**🔍 | Found:** \`${song.name}\`\n**Played By: \`${song.user.username}\`**`, embeds: [embed] })
                const filter = (reaction, user) => user.id == song.user.id;
                let collector = await msg.createReactionCollector({
                    filter: filter,
                    time: 0
                });
                collector.on("collect", async(reaction, user) => {
                    if (user.partial) await user.fetch();
                    if (reaction.partial) await reaction.fetch();
                    if (reaction.message.partial) await reaction.message.fetch();
                    if (user.bot) return;
                    reaction.users.remove(user.id);
                    if (user.id !== song.user.id) return;
                    let queue = player.getQueue(interaction);
                    if (reaction.emoji.name == "⏯️") {
                        try {
                            reaction.users.remove(user.id)
                            if (queue) {
                                if (queue.paused == true) player.resume(interaction)
                                else player.pause(interaction)
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "⏹️") {
                        try {
                            reaction.users.remove(user.id)
                            player.stop(interaction)
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "⏭️") {
                        try {
                            if (queue) {
                                reaction.users.remove(user.id)
                                if (queue.songs.map((song, i) => i).length == 1) return;
                                player.skip(interaction)
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "🔄") {
                        try {
                            reaction.users.remove(user.id)
                            if (queue.repeatMode == 0) player.setRepeatMode(interaction, parseInt(1))
                            if (queue.repeatMode == 1) player.setRepeatMode(interaction, parseInt(0))
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "🔀") {
                        try {
                            reaction.users.remove(user.id)
                            if (queue) {
                                player.shuffle(interaction)
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "🔉") {
                        try {
                            reaction.users.remove(user.id)
                            if (queue) {
                                let vol = queue.volume;
                                player.setVolume(interaction, Number(vol) - 10)
                            }
                        } catch {
                            console.log('')
                        }
                    } else if (reaction.emoji.name == "🔊") {
                        try {
                            reaction.users.remove(user.id)
                            if (queue) {
                                let vol = queue.volume;
                                player.setVolume(interaction, Number(vol) + 10)
                            }
                        } catch {
                            console.log('')
                        }
                    }
                });
            } else if (panelType == "none") {
                queue.textChannel.send({ content: `**🔍 | :تم العثور على** \`${song.name}\`\n**تم التشغيل عن طريق: \`${song.user.username}\`**`, embeds: [embed] });
            }
        }
    }
    if (interaction) {
        try {
            player.setVolume(interaction, Number(db.fetch(`DefVol_${interaction.guild.id}`)) || 100);
        } catch {
            console.log('')
        }
    }
}