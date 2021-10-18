const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
        name: "queue",
        description: "Preview The Server Queue",
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
                    const voiceChannel = interaction.member.voice.channel;
                    if (!voiceChannel) {
                        interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                        return
                    }
                    const queue = player.getQueue(interaction);
                    if (!queue) return interaction.followUp({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
                    interaction.followUp({
                                embeds: [new MessageEmbed()
                                        .setAuthor(`Server Queue`, client.user.avatarURL({ dynamic: true }), `https://discord.gg/developer-support`)
                                        .setColor('YELLOW')
                                        .setDescription(`__Now Playing:__\n${queue.songs.map((song, id) => `**[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``).slice(0, 1).join("\n")}\n\n__Up Next:__\n${queue.songs.map((song, id) => `**${id + 1}**. **[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``).slice(1, 10).join("\n")}`)],
                                allowedMentions: false,
                                ephemeral: true
                    });
                } else if (lang == "ar") {
                    const voiceChannel = interaction.member.voice.channel;
                    if (!voiceChannel) {
                        interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                        return
                    }
                    const queue = player.getQueue(interaction);
                    if (!queue) return interaction.followUp({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
                    interaction.followUp({
                                embeds: [new MessageEmbed()
                                        .setAuthor(`Server Queue`, client.user.avatarURL({ dynamic: true }), `https://discord.gg/developer-support`)
                                        .setColor('YELLOW')
                                        .setDescription(`__Now Playing:__\n${queue.songs.map((song, id) => `**[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``).slice(0, 1).join("\n")}\n\n__Up Next:__\n${queue.songs.map((song, id) => `**${id + 1}**. **[${song.name}](${song.url})** | \`${song.formattedDuration}\` | \`Requested By: ${song.user.tag}\``).slice(1, 10).join("\n")}`)],
                                        allowedMentions: false,
                                        ephemeral: true
                    });
        }
    },
};