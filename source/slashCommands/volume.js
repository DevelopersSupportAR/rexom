const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');

module.exports = {
    name: "volume",
    description: "Controle Volume The Music",
    type: 'CHAT_INPUT',
    options: [{
        name: "number",
        description: "The New Volume Number",
        type: "NUMBER",
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
            module.exports.guildID = interaction.guild.id;
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            player.setVolume(interaction, Number(interaction.options.getNumber('number') || 100))
            interaction.followUp({ content: "🔊 | **Music Volume Has Changed To: **" + interaction.options.getNumber('number') || 100, allowedMentions: false, ephemeral: true })
        } else if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            player.setVolume(interaction, Number(interaction.options.getNumber('number') || 100))
            interaction.followUp({ content: "🔊 | **تم تغير مستوى الصوت الى: **" + interaction.options.getNumber('number') || 100, allowedMentions: false, ephemeral: true })
        }
    },
};