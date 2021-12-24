const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
        name: "queue",
        aliases: [],
        description: "Preview The Server Queue",

        /**
         * 
         * @param {Client} client
         * @param {Message} message
         * @param {Guild} guild
         */

        run: async(client, message, args, prefix, lang) => {
                try {
                    if (lang == "en") {
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
                        message.reply({
                                    embeds: [new MessageEmbed()
                                            .setAuthor(`Server Queue`, client.user.avatarURL({ dynamic: true }), `https://discord.gg/developer-support`)
                                            .setColor('YELLOW')
                                            .setDescription(`__Now Playing:__\n${queue.songs.map((song, id) => `**[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``).slice(0, 1).join("\n")}\n\n__Up Next:__\n${queue.songs.map((song, id) => `**${id + 1}**. **[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``).slice(1, 10).join("\n")}`)],
                        allowedMentions: {
            repliedUser: false
        },
                        ephemeral: true
            });
        } else if (lang == "ar") {
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
            message.reply({
                        embeds: [new MessageEmbed()
                                .setAuthor(`Server Queue`, client.user.avatarURL({ dynamic: true }), `https://discord.gg/developer-support`)
                                .setColor('YELLOW')
                                .setDescription(`__Now Playing:__\n${queue.songs.map((song, id) => `**[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``).slice(0, 1).join("\n")}\n\n__Up Next:__\n${queue.songs.map((song, id) => `**${id + 1}**. **[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``).slice(1, 10).join("\n")}`)],
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