const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "skip",
    description: "Skip The Music",
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
            if (queue.songs.map((song, i) => i).length == 1) return interaction.followUp({ content: ":x: | **Thare Are No Song To Skip**", ephemeral: true });
            else {
                player.skip(interaction);
                interaction.followUp({ content: "⏭ | **Music Has Skiped**", allowedMentions: false, ephemeral: true })
            }
        } else if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            if (queue.songs.map((song, i) => i).length == 1) return interaction.followUp({ content: ":x: | **مفيش حاجه اسكب ليه هل ات عبيت**", ephemeral: true });
            else {
                player.skip(interaction)
                interaction.followUp({ content: "⏭ | **تم تخطي الغنيه**", allowedMentions: false, ephemeral: true })
            }
        }
    },
};