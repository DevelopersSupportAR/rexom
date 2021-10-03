const { Client, CommandInteraction, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const { player } = require('../index');
const db = require('quick.db');

module.exports = {
    name: "autoplay",
    description: "Set Auto Play Toggle",
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
                interaction.followUp({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
            let mode = player.toggleAutoplay(interaction);
            interaction.followUp({
                content: emojis.done + ` | **Autoplay toggle has changed to: ` + (mode ? "On" : "Off") + "**",
                ephemeral: true,
                allowedMentions: false
            });
        } else if (lang == "ar") {
            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel) {
                interaction.followUp({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
                return
            }
            const queue = player.getQueue(interaction);
            if (!queue) return interaction.followUp({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
            let mode = player.toggleAutoplay(interaction);
            interaction.followUp({
                content: emojis.done + ` | وضع التشغيل التلقئاء تحول لـ**: ` + (mode ? "On" : "Off") + "**",
                ephemeral: true,
                allowedMentions: false
            });
        }
    },
};