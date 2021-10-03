const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "filter",
    description: "songs filters",
    type: 'CHAT_INPUT',
    options: [{
        name: "value",
        description: "The Filter Name",
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
        if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            if (['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax'].includes(interaction.options.getString("value"))) {
                player.setFilter(interaction, args[0]);
                interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                        .setAuthor(`🎭 | Filters`, client.user.avatarURL({ dynamic: true }), `https://discord.gg/developer-support`)
                        .setColor('GREEN')
                        .setDescription(`🎭 | queue filter has been changed to \`${interaction.options.getString("value")}\``)
                        .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                    ],
                    ephemeral: true,
                    allowedMentions: false
                });
            } else interaction.followUp({
                content: emojis.error + " | لا يمكنني العثور على هذا الأسم يمكنك الأختيار من هذه القائمه: ['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax']",
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "en") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            if (['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax'].includes(interaction.options.getString("value"))) {
                player.setFilter(interaction, args[0]);
                interaction.followUp({
                    embeds: [
                        new MessageEmbed()
                        .setAuthor(`🎭 | Filters`, client.user.avatarURL({ dynamic: true }), `https://discord.gg/developer-support`)
                        .setColor('GREEN')
                        .setDescription(`🎭 | queue filter has been changed to \`${interaction.options.getString("value")}\``)
                        .setFooter(client.user.username, client.user.avatarURL({ dynamic: true }))
                    ],
                    ephemeral: true,
                    allowedMentions: false
                });
            } else interaction.followUp({
                content: emojis.error + " | i can't find this filter name in my list, choose from thare: ['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax']",
                ephemeral: true,
                allowedMentions: false
            });
        }
    },
};